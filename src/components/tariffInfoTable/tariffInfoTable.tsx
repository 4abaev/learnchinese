import { Icon, Table, TableCaption, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import { BsInfinity } from 'react-icons/bs';
import { useTranslations } from 'use-intl';

const TariffInfoTable = () => {
    const t = useTranslations('Subscription');

    return (
        <Table my={8} maxWidth={[320, 440, 700]} mx={'auto'}   variant={'simple'}>
            <TableCaption my={2} fontSize={22} placement={'top'}>{t('info-h')}</TableCaption>
            <Tbody bgColor={'#EDEDED'}>
                <Tr >
                    <Td px={[1, 2, 6]}>{t('info-h1')}</Td>
                    <Td px={[1, 6]} textAlign={'center'}>{t('info-h2')}</Td>
                    <Td px={[1, 2, 6]} textAlign={'center'} bgColor={'rgba(136,255,140,0.72)'}>{t('info-h3')}</Td>
                </Tr>
                <Tr>
                    <Td px={[1, 2, 6]}>{t('info-p-translating')}</Td>
                    <Td px={[1, 2, 6]} textAlign={'center'}><Text fontWeight={'bold'}>10</Text> <Text>
                        {t('info-p-day')}
                    </Text></Td>
                    <Td px={[1, 2, 6]} textAlign={'center'} bgColor={'rgba(136,255,140,0.72)'}>
                        <Icon boxSize={6}  as={BsInfinity} />
                        <Text fontWeight={'bold'}>{t('info-p-unlimited')}</Text>
                    </Td>
                </Tr>
                <Tr>
                    <Td px={[1, 2, 6]}>{t('info-p-add-word')}</Td>
                    <Td px={[1, 2, 6]} textAlign={'center'}><Text fontWeight={'bold'}>5</Text> <Text>
                        {t('info-p-day')}
                    </Text></Td>
                    <Td px={[1, 2, 6]} textAlign={'center'} bgColor={'rgba(136,255,140,0.72)'}>
                        <Icon boxSize={6}  as={BsInfinity} />
                        <Text fontWeight={'bold'}>{t('info-p-unlimited')}</Text>
                    </Td>
                </Tr>
                <Tr>
                    <Td px={[1, 2, 6]}>{t('info-p-watch')}</Td>
                    <Td px={[1, 2, 6]} textAlign={'center'}><Text fontWeight={'bold'}>15 {t('info-p-minutes')}</Text><Text>
                        {t('info-p-day')}
                    </Text></Td>
                    <Td px={[1, 2, 6]} textAlign={'center'} bgColor={'rgba(136,255,140,0.72)'}>
                        <Icon boxSize={6} as={BsInfinity} />
                        <Text fontWeight={'bold'}>{t('info-p-unlimited')}</Text>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    );
};

export default TariffInfoTable;