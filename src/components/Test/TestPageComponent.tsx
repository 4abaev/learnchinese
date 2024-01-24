'use client';
import { useEffect } from 'react';
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react';
import { useTranslations } from 'use-intl';
import { useSessionStorage } from 'usehooks-ts';
import { useActions, useAppSelector } from '@/state/store';
import TestComponent, { Answer } from '@/components/Test/TestComponent';

const TestPageComponent = () => {
    const { getTest } = useActions();
    const [answers, setAnswers] = useSessionStorage<Answer[]>('answers', []);

    useEffect(() => {
        getTest();
    }, [getTest, setAnswers]);

    useEffect(() => {
        answers.length >= 5 && setAnswers([]);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { isLoading, words } = useAppSelector((state) => state.test);

    const t = useTranslations('Test');
    return (
        <Box my={12}>
            {isLoading ?
                <Flex flexDir={'column'} alignItems={'center'}>
                    <Spinner size={'md'} />
                    <Heading fontSize={20}>{t('test-loading')}</Heading>
                </Flex>
                :
                <TestComponent words={words} />
            }
        </Box>
    );
};
export default TestPageComponent;