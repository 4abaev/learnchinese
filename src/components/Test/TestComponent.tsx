import React, { useCallback, useMemo, useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    Input,
    Button,
    StepIndicator,
    StepIcon,
    StepStatus,
    StepNumber,
    StepSeparator, Flex, Heading, Icon, Text, RadioGroup, Radio, Stack,
} from '@chakra-ui/react';
import { useTranslations } from 'use-intl';
import { CiFaceFrown, CiFaceMeh, CiFaceSmile } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from 'react-icons/hi';
import { useSessionStorage } from 'usehooks-ts';
import { useActions } from '@/state/store';
import { IWord } from '@/api/test';
import TestResultTable from '@/components/Test/TestResultTable';

function getElementByIndex(answers: Answer[], index: number): Answer | undefined {
    return answers.find(answer => answer.index === index);
}

// Функция для генерации неправильных вариантов пиньина
const generateIncorrectPinyinOptions = (currentWord: IWord, words: IWord[]) => {
    const incorrectPinyinOptions = words
        .filter(word => word !== currentWord)
        .map(word => word.pinyin);

    return incorrectPinyinOptions.slice(0, 2);
};

// Функция для генерации неправильных вариантов перевода
const generateIncorrectTranslationOptions = (currentWord: IWord, words: IWord[], isRussianLocale: boolean) => {
    const incorrectTranslationOptions = words
        .filter(word => word !== currentWord)
        .map(word => (isRussianLocale ? word.wordOnRu : word.wordOnEn));

    return incorrectTranslationOptions.slice(0, 2);
};

const shuffleArray = (array: string[]) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

export interface Answer {
    index: number;
    wordOnChinese: string;
    selectedTranslation: string;
    selectedPinyin: string;
    correctTranslate: string;
    correctPinyin: string;
    isCorrect: boolean;
}
interface TestComponentProps {
    words: IWord[];
}

const TestComponent = ({ words }: TestComponentProps) => {
    const [step, setStep] = useState(0);
    const [selectedPinyin, setSelectedPinyin] = useState<string>('');
    const [selectedTranslation, setSelectedTranslation] = useState<string>('');
    const [answers, setAnswers] = useSessionStorage<Answer[]>('answers', []);
    const { NEXT_LOCALE } = parseCookies();

    const [translates, setTranslates] = useState<string[]>(step < 5 ? shuffleArray([
        NEXT_LOCALE === 'ru' ? words[step].wordOnRu : words[step].wordOnEn,
        ...generateIncorrectTranslationOptions(words[step], words, NEXT_LOCALE === 'ru'),
    ]) : []);
    const [pinyins, setPinyins] = useState<string[]>(step < 5 ? shuffleArray([words[step].pinyin, ...generateIncorrectPinyinOptions(words[step], words)]) : []);

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { endTest, getTest } = useActions();

    const handlePinyinSelect = useCallback((selectedOption: string) => {
        setSelectedPinyin(selectedOption);
    }, []);

    const handleTranslationSelect = useCallback((selectedOption: string) => {
        setSelectedTranslation(selectedOption);
    }, []);
    const isLastStep = useMemo(() => step === words.length - 1, [step, words.length]);

    const t = useTranslations('Test');
    const handleStepChange = useCallback((newStep: number) => {
        setStep(newStep);
        const answer = getElementByIndex(answers, newStep);
        if (answer) {
            setSelectedPinyin(answer.selectedPinyin);
            setSelectedTranslation(answer.selectedTranslation);
        } else {
            setSelectedPinyin('');
            setSelectedTranslation('');
        };
        if(!isLastStep) {
            setTranslates([
                NEXT_LOCALE === 'ru' ? words[newStep].wordOnRu : words[newStep].wordOnEn,
                ...generateIncorrectTranslationOptions(words[newStep], words, NEXT_LOCALE === 'ru'),
            ]);
            setPinyins(shuffleArray([words[newStep].pinyin, ...generateIncorrectPinyinOptions(words[newStep], words)]));
        }

    }, [answers, words, NEXT_LOCALE, isLastStep]);



    const handleNextStep = useCallback(() => {
        if (!selectedPinyin || !selectedTranslation) {
            setError(t('test-input-error'));
            return;
        }

        const word = words[step];
        const isCorrectPinyin = selectedPinyin === word.pinyin;
        const isCorrectTranslation =
            (NEXT_LOCALE === 'ru' && selectedTranslation === word.wordOnRu) ||
            (NEXT_LOCALE === 'en' && selectedTranslation === word.wordOnEn);

        const isCorrect = isCorrectPinyin && isCorrectTranslation;

        const answerObject = {
            index: step,
            wordOnChinese: word.wordOnChinese,
            selectedPinyin: selectedPinyin,
            selectedTranslation: selectedTranslation,
            correctTranslate: NEXT_LOCALE === 'ru' ? words[step].wordOnRu : words[step].wordOnEn,
            correctPinyin: words[step].pinyin,
            isCorrect: isCorrect,
        };

        const existingIndex = answers.findIndex(answer => answer.wordOnChinese === answerObject.wordOnChinese);

        if (existingIndex !== -1) {
            const updatedAnswers = [...answers];
            updatedAnswers[existingIndex] = answerObject;
            setAnswers(updatedAnswers);
        } else {
            const updatedAnswers = [...answers, answerObject];
            setAnswers(updatedAnswers);
        }

        setError(null);
        setSelectedPinyin('');
        setSelectedTranslation('');
        handleStepChange(step + 1);
    }, [NEXT_LOCALE, handleStepChange, answers, setAnswers, selectedPinyin, selectedTranslation, step, t, words]);

    const isEnd = useMemo(() => step === words.length, [step, words.length]);
    const handleEndTest = useCallback(() => {
        endTest();
    }, [endTest]);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAnswer();
        }
    };
    const handleAnswer = useCallback(() => {
        handleNextStep();
        isLastStep && handleEndTest();
    }, [handleEndTest, handleNextStep, isLastStep]);

    const handleRetry = useCallback(() => {
        getTest();
        setAnswers([]);
    }, [setAnswers, getTest]);

    const correctAnswers = useMemo(() => {
        return answers.filter(answer => answer.isCorrect).length;
    }, [answers]);

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);


    return (
        <Box>
            <Stepper mx={'auto'} px={1} minW={320} maxW={360} mb={4} index={step}>
                {words.map((word, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
            {words[step] && (
                <Flex flexDir={'column'} alignItems={'center'}>
                    <Heading>{words[step].wordOnChinese}</Heading>
                    <Flex mt={4} gap={[10, 10, 40]} justifyContent={'space-between'} maxWidth={500}>
                        <RadioGroup flexDirection={'column'} onChange={handlePinyinSelect} value={selectedPinyin}>
                            <Stack>
                            {pinyins.map(
                                (option, index) => (
                                    <Radio key={index} value={option}>
                                        {option}
                                    </Radio>
                                )
                            )}
                            </Stack>
                        </RadioGroup>

                        <RadioGroup onChange={handleTranslationSelect} value={selectedTranslation}>
                            <Stack>
                            {translates.map((option, index) => (
                                <Radio key={index} value={option}>
                                    {option}
                                </Radio>
                            ))}
                            </Stack>
                        </RadioGroup>
                    </Flex>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {isLastStep ? (
                        <Button colorScheme={'green'} m={4} onClick={handleAnswer}>
                            {t('finish')}
                        </Button>
                    ) : (
                        <Button colorScheme={'green'} m={4} onClick={handleAnswer}>
                            {t('next')}
                            <Icon ml={2} boxSize={5} as={HiOutlineArrowRight} />
                        </Button>
                    )}
                </Flex>
            )}
            {isEnd && (
                <Box my={8}>
                    <Flex px={1} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Text>{t('test-completed', { correctAnswers, total: words.length })}</Text>
                        {correctAnswers >= 5 && <Icon mx={2} boxSize={6} color={'green'} as={CiFaceSmile} />}
                        {correctAnswers > 2 && correctAnswers < 5 &&
                            <Icon mx={2} boxSize={6} color={'orange'} as={CiFaceMeh} />}
                        {correctAnswers <= 2 && <Icon mx={2} boxSize={6} color={'red'} as={CiFaceFrown} />}
                    </Flex>
                    <Flex mt={4} justifyContent={'space-around'}>
                        <Button onClick={handleBack}>
                            <Icon ml={2} boxSize={5} as={HiOutlineArrowLeft} />{t('test-back')}
                        </Button>
                        <Button colorScheme={'green'} onClick={handleRetry}>{t('test-retry')}</Button>
                    </Flex>
                    <TestResultTable answers={answers} />
                </Box>
            )}
        </Box>
    );
};

export default TestComponent;
