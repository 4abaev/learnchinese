'use client';
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Icon } from '@chakra-ui/react';
import { CiFaceSmile, CiFaceFrown } from 'react-icons/ci';
import { useTranslations } from 'use-intl';
import { Answer } from '@/components/Test/TestComponent';

const TestResultTable = ({ answers }: { answers: Answer[]}) => {
    const t = useTranslations('Test');
    return (
        <Table mx={'auto'} mt={8} variant='striped' size='sm' maxW={[320, 540]}>
            <Thead>
                <Tr>
                    <Th p={[1, 4]} fontSize={[12, 18]}>{t('answer-word')}</Th>
                    <Th p={[1, 4]} fontSize={[12, 18]}>{t('answer-right')}</Th>
                    <Th p={[1, 4]} fontSize={[12, 18]}>{t('answer-client')}</Th>
                    <Th p={[1, 4]} fontSize={[12, 18]} maxW={16}></Th>
                </Tr>
            </Thead>
            <Tbody>
                {answers.map((answer, index) => (
                    <Tr key={index}>
                        <Td p={[1, 4]} fontSize={[14, 18]}>{answer.wordOnChinese}</Td>
                        <Td p={[1, 4]} fontSize={[14, 18]}>{answer.correctPinyin} <br /> {answer.correctTranslate}</Td>
                        <Td p={[1, 4]} fontSize={[14, 18]}>{answer.selectedPinyin} <br /> {answer.selectedTranslation}</Td>
                        <Td p={[1, 4]} fontSize={[14, 18]}>
                            {answer.isCorrect ? (
                                <Icon boxSize={[4, 7]}  color='green' as={CiFaceSmile} />
                            ) : (
                                <Icon boxSize={[4, 7]} as={CiFaceFrown}  color='red' />
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default TestResultTable;