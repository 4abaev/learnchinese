'use client';

import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useTranslations } from 'use-intl';

const Oferta = () => {
    const t = useTranslations('Oferta');
    return (
        <Box maxWidth={991} my={8} px={2} mx={'auto'}>
            <Heading textAlign={'center'} as={'h1'} fontSize={'xl'}>
                {t('heading')}
            </Heading>
            <Text textAlign={'center'}>                {t('city')}
            </Text>

            <Heading as={'h2'} fontSize={'lg'} my={4}>
                1. {t('section-1')}

            </Heading>

            <Text my={1}>1.1 {t('section-1-1')}</Text>

            <Text my={1}>1.2 {t('section-1-2')}</Text>

            <Text my={1}>1.3 {t('section-1-3')}</Text>

            <Text my={1}>1.4 {t('section-1-4')}</Text>

            <UnorderedList mb={8}>
                <ListItem>{t('section-1-4-1')}</ListItem>
                <ListItem>{t('section-1-4-2')}</ListItem>
                <ListItem>{t('section-1-4-3')}</ListItem>
                <UnorderedList>
                    <ListItem>{t('section-1-4-4')}</ListItem>
                </UnorderedList>
            </UnorderedList>

            <Text my={1}>{t('section-1-4-5')}</Text>

            <Text my={1}>{t('section-1-4-6')}</Text>

            <Text my={1}>{t('section-1-4-7')}</Text>

            <Text my={1}>{t('section-1-4-8')}</Text>

            <Text my={1}>1.5 {t('section-1-5')}</Text>

            <Text my={1}>1.6 {t('section-1-6')}</Text>

            <Text my={1}>1.7 {t('section-1-7')}</Text>

            <Text my={1}>1.8 {t('section-1-8')}</Text>

            <UnorderedList mb={8}>
                <ListItem>{t('section-1-8-1')}</ListItem>
                <ListItem>{t('section-1-8-2')}</ListItem>
                <ListItem>{t('section-1-8-3')}</ListItem>
                <ListItem>{t('section-1-8-4')}</ListItem>
            </UnorderedList>

            <Text my={1}>1.9 {t('section-1-9')}</Text>

            <Text my={1}>1.10 {t('section-1-10')}</Text>

            <Text my={1}>1.11 {t('section-1-11')}</Text>

            <Text my={1}>1.12 {t('section-1-12')}</Text>
            <Text my={1}>
                {t('section-1-13')}
            </Text>

            <Text my={1}>
                {t('section-1-14')}
            </Text>

            <Text my={1}>
                {t('section-1-15')}
            </Text>

            <Text my={1}>
                {t('section-1-16')}
            </Text>

            <Text my={1}>
                {t('section-1-17')}
            </Text>

            <Text my={1}>
                {t('section-1-18')}            </Text>

            <Text my={1}>
                {t('section-1-19')}
            </Text>

            <Text my={1}>
                {t('section-1-20')}            </Text>

            <Text my={1}>
                {t('section-1-21')}            </Text>

            <Text my={1}>
                {t('section-1-22')}            </Text>

            <Text my={1}>
                {t('section-1-23')}            </Text>

            <Text my={1}>
                {t('section-1-24')}            </Text>

            <Text my={1}>
                {t('section-1-25')}            </Text>

            <Text my={3} fontWeight={'bold'}>
                2. {t('section-2')}
            </Text>

            <Text my={1}>
                2.1 {t('section-2-1')}
            </Text>

            <Text my={1}>
                2.2 {t('section-2-2')}
            </Text>

            <Text my={1}>
                2.3 {t('section-2-3')}
            </Text>

            <Text my={1}>
                {t('section-2-3-1')}            </Text>

            <Text my={1}>
                2.4 {t('section-2-4')}
            </Text>

            <Text my={1}>
                2.5 {t('section-2-5')}
            </Text>

            <Text my={1}>
                2.6 {t('section-2-6')}
            </Text>

            <UnorderedList mt={4} mb={8}>
                <ListItem> {t('section-2-6-1')}</ListItem>
                <ListItem> {t('section-2-6-2')}</ListItem>
                <ListItem> {t('section-2-6-3')}</ListItem>
            </UnorderedList>

            <Text my={1}>
                2.7 {t('section-2-7')}
            </Text>

            <Text my={1}>
                3. {t('section-3')}
            </Text>

            <Text my={1}>
                3.1 {t('section-3-1')}
            </Text>

            <Text my={1}>
                3.1.1 {t('section-3-1-1')}
            </Text>

            <Text my={1}>
                3.1.2. {t('section-3-1-2')}
            </Text>

            <Text my={1}>
                3.1.3 {t('section-3-1-3')}
            </Text>
            <Text my={3} fontWeight={'bold'}>4. {t('section-4')}</Text>
            <Text>
                4.1 {t('section-4-1')}
            </Text>
            <Text>
                4.2 {t('section-4-2')}
            </Text>
            <Text>
                4.3 {t('section-4-3')}
            </Text>
            <Text>4.4 {t('section-4-4')}</Text>
            <Text>
                4.5 {t('section-4-5')}
            </Text>
            <Text>4.6 {t('section-4-6')}</Text>
            <Text>
                - {t('section-4-6-1')}
            </Text>
            <Text>- {t('section-4-6-2')}</Text>
            <Text>
                4.7 {t('section-4-7')}
            </Text>
            <Text>
                4.8 {t('section-4-8')}
            </Text>
            <Text>
                4.9 {t('section-4-9')}
            </Text>
            <Text>
                4.10 {t('section-4-10')}
            </Text>
            <Text>
                4.11 {t('section-4-11')}
            </Text>
            <Text>
                4.12 {t('section-4-12')}
            </Text>
            <Text my={3} fontWeight={'bold'}>
                5. {t('section-5')}
            </Text>

            <Text my={1}>
                5.1 {t('section-5-1')}
            </Text>

            <Text my={1}>
                5.2 {t('section-5-2')}
            </Text>

            <Text my={1}>
                5.3 {t('section-5-3')}
            </Text>

            <Text my={3} fontWeight={'bold'}>
                6. {t('section-6')}
            </Text>

            <Text my={1}>
                6.1 {t('section-6-1')}
            </Text>

            <Text my={1}>
                6.2 {t('section-6-2')}
            </Text>

            <Text my={1}>
                6.3 {t('section-6-3')}
            </Text>

            <Text my={1}>
                6.4 {t('section-6-4')}
            </Text>

            <Text my={1}>
                6.5 {t('section-6-5')}
            </Text>

            <Text my={3} fontWeight={'bold'}>
                7. {t('section-7')}
            </Text>

            <Text my={1}>
                7.1 {t('section-7-1')}
            </Text>

            <Text my={1}>
                7.2 {t('section-7-2')}
            </Text>

            <Text my={1}>
                7.3 {t('section-7-3')}
            </Text>

            <Text my={1}>
                7.4 {t('section-7-4')}
            </Text>

            <Text my={1}>
                7.5 {t('section-7-5')}
            </Text>

            <Text my={1}>
                7.6 {t('section-7-6')}
            </Text>

            <Text my={3} fontWeight={'bold'}>
                8. {t('section-8')}
            </Text>

            <Text my={1}>
                8.1 {t('section-8-1')}
            </Text>
            <Text my={3} fontWeight={'bold'}>
                9. {t('section-9')}
            </Text>

            <Text my={1}>
                9.1 {t('section-9-1')}
            </Text>

            <Text my={1}>
                9.2 {t('section-9-2')}
            </Text>

            <Text my={1}>
                9.3 {t('section-9-3')}
            </Text>

            <Text my={1}>
                9.4 {t('section-9-4')}
            </Text>

            <Text my={1}>
                {t('section-9-4-1')}
            </Text>

            <Text my={1}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                9.5 {t('section-9-5')}
            </Text>

            <Text my={1}>
                {t('section-9-5-1')}            </Text>

            <Text my={1}>
                9.6 {t('section-9-6')}
            </Text>

            <Text my={1}>
                - {t('section-9-6-1')}
            </Text>

            <Text my={1}>
                - {t('section-9-6-2')}
            </Text>

            <Text my={1}>
                - {t('section-9-6-3')}
            </Text>

            <Text my={1}>
                9.7 {t('section-9-7')}
            </Text>

            <Text my={1}>
                9.8 {t('section-9-8')}
            </Text>

            <Text my={3} fontWeight={'bold'}>
                10. {t('section-10')}
            </Text>

            <Text my={1}>
                10.1 {t('section-10-1')}
            </Text>

            <Text my={1}>
                10.2 {t('section-10-2')}
            </Text>

            <Text my={1}>
                10.3 {t('section-10-3')}
            </Text>

            <Text my={1}>
                10.4 {t('section-10-4')}
            </Text>

            <Text my={1}>
                10.5 {t('section-10-5')}
            </Text>

            <Text my={1}>
                10.6 {t('section-10-6')}
            </Text>

            <Text my={1}>
                10.7 {t('section-10-7')}
            </Text>
            <Text my={3} fontWeight={'bold'}>11. {t('section-11')}</Text>
            <Text>
                11.1 {t('section-11-1')}
            </Text>
            <Text>
                11.2 {t('section-11-2')}
            </Text>
            <Text>
                11.3 {t('section-11-3')}
            </Text>
            <Text>
                11.4 {t('section-11-4')}
            </Text>
            <Text>
                11.5 {t('section-11-5')}
            </Text>
            <Text my={3} fontWeight={'bold'}>
                12. {t('section-12')}
            </Text>

            <Text my={1}>
                {t('section-12-name')}
            </Text>

            <Text my={1}>
                {t('section-12-email')}
            </Text>

            <Text my={1}>
                {t('section-12-phone')}
            </Text>
        </Box>
    );
};

export default Oferta;


