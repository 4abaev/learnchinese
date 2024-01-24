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
    StepSeparator, Flex, Heading, Icon, Text,
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
export interface Answer {
    index: number;
    wordOnChinese: string;
    yourAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}
interface TestComponentProps {
    words: IWord[];
}

const TestComponent = ({ words }: TestComponentProps) => {
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState<string>('');
    const [answers, setAnswers] = useSessionStorage<Answer[]>('answers', []);

    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { endTest, getTest } = useActions();

    const t = useTranslations('Test');
    const { NEXT_LOCALE } = parseCookies();
    const handleStepChange = useCallback((newStep: number) => {
        setStep(newStep);
        const answer = getElementByIndex(answers, newStep);
        answer ? setInputValue(answer.yourAnswer) : setInputValue('');
    }, [answers]);
    const handleNextStep = useCallback(() => {
        if (!inputValue.trim()) {
            setError(t('test-input-error'));
            return;
        }

        const inputValueNormalized = inputValue.toLowerCase().replace(/ё/g, 'е').trim();
        const word = NEXT_LOCALE === 'ru' ? words[step].wordOnRu : words[step].wordOnEn;
        const wordNormalized = word.toLowerCase().replace(/ё/g, 'е');
        const isCorrect = inputValueNormalized === wordNormalized;
        const answerObject = {
            index: step,
            wordOnChinese: words[step].wordOnChinese,
            yourAnswer: inputValue.trim(),
            correctAnswer: NEXT_LOCALE === 'ru' ? words[step].wordOnRu : words[step].wordOnEn,
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
        setInputValue('');
        handleStepChange(step + 1);
    }, [NEXT_LOCALE, handleStepChange, answers, setAnswers, inputValue, step, t, words]);
    const isLastStep = useMemo(() => step === words.length - 1, [step, words.length]);
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
            {words[step] && <Flex flexDir={'column'} alignItems={'center'}>
                <Heading>{words[step].wordOnChinese}</Heading>
                <Input
                    width={250}
                    mt={4}
                    placeholder={t('placeholder')}
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setInputValue(e.target.value);
                    }}
                    onKeyDown={handleInputKeyDown}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {isLastStep ?
                    <Button colorScheme={'green'} m={4} onClick={handleAnswer}>{t('finish')}</Button>
                    :
                    <Button colorScheme={'green'} m={4} onClick={handleAnswer}>{t('next')}<Icon ml={2}
                        boxSize={5}
                        as={HiOutlineArrowRight} /></Button>}

            </Flex>}
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
                    <TestResultTable answers={answers}/>
                </Box>
            )}
        </Box>
    );
};

export default TestComponent;
