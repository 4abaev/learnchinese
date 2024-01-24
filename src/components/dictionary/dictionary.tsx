'use client';

import { Box, Heading, Table, Tbody, Thead, Tr, Th } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import { parseCookies } from 'nookies';
import { useActions, useAppSelector } from '@/state/store';
import WordItem from '@/components/dictionary/WordItem';
import AudioSettingsController from '@/components/dictionary/voiceOptions';
import TestStart from '@/components/Test/testStart';

const DictionaryComponent = () => {
    const { words } = useAppSelector((state) => state.dictionary);
    const { getDictionary } = useActions();
    const t = useTranslations('Dictionary');
    const [speakingRate, setSpeakingRate] = useState<number>(1);
    useEffect(() => {
        getDictionary();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { NEXT_LOCALE } = parseCookies();
    const isRu = NEXT_LOCALE === 'ru';
    return (
        <Box>
            <TestStart />
            <AudioSettingsController speakingRate={speakingRate} setSpeakingRate={setSpeakingRate} />
            <Heading my={6} textAlign={'center'}>{t('heading')}</Heading>

            <Table size='sm' variant='simple' maxW={'100%'}>
                <Thead >
                    <Tr>
                        <Th p={[1, 4]} fontSize={[14, 18]}>{isRu ? 'Китайский' : 'Chinese'}</Th>
                        <Th p={[1, 4]} fontSize={[14, 18]}>{isRu ? 'Пиньинь' : 'Pinyin'}</Th>
                        <Th p={[1, 4]} fontSize={[14, 18]}>{isRu ? 'Русский' : 'English'}</Th>
                        <Th p={[1, 4]} maxWidth={10}></Th>
                        <Th p={[1, 4]} maxWidth={10}></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {words.map((word, index) => (
                        <WordItem speakingRate={speakingRate} word={word} isRu={isRu} key={index} />
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default DictionaryComponent;