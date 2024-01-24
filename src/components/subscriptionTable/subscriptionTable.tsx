'use client';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Text } from '@chakra-ui/react';
import { useTranslations } from 'use-intl';
import { useAppSelector } from '@/state/store';

const SubscriptionTable = () => {
    const { subscriptions } = useAppSelector((state) => state.subscription);
    const t = useTranslations('Subscription');
    return subscriptions.length ? (
        <TableContainer mx={'auto'} minW={[320, 440, 670]} mt={6}>
            <Text textAlign={'center'} fontSize={'3xl'} my={4}>
                {t('sh')}
            </Text>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th  p={[2, 4]}>{t('startDay')}</Th>
                        <Th  p={[2, 4]}>{t('createdDay')}</Th>
                        <Th  p={[2, 4]}>{t('endDay')}</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {subscriptions.map((item) => (
                        <Tr key={item.createdAt}>
                            <Td fontSize={[10, 12]} p={[2, 4]}>{item.startDay}</Td>
                            <Td fontSize={[10, 12]} p={[2, 4]}>{new Date(item.createdAt).toDateString()}</Td>
                            <Td fontSize={[10, 12]} p={[2, 4]}>{item.dueToDay}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    ) : null;
};
export default SubscriptionTable;
