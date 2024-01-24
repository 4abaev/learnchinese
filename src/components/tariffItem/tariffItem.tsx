'use client';
import { Box, Button, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import { ITariff } from '@/api/tariff';

interface tariffItemProps extends ITariff {
    handleSubscribe: (id: ITariff['id']) => void;
}

const TariffItem = ({ attributes, handleSubscribe, id }: tariffItemProps) => {
    const t = useTranslations('Tariff');
    return (
        <Box flexDir={'column'} border={'3px solid #72b172'} p={2} w={'180px'}>
            <Text fontSize={'xl'} textAlign={'center'}>
                {attributes.month}{' '}
                {attributes.month === 1
                    ? t('singularMonth')
                    : attributes.month === 2 || attributes.month === 3 || attributes.month === 4
                        ? t('plural3Months')
                        : t('plural6Months')}
            </Text>
            <Text mt={10} fontSize={'l'} textAlign={'center'}>
                {attributes.price} <Text as='span'>{t('rub')}</Text>
            </Text>
            <Button
                onClick={() => handleSubscribe(id)}
                mt={4}
                w={'100%'}
                colorScheme={'blue'}
                borderRadius={'15px'}
            >
                {t('checkout')}
            </Button>
        </Box>
    );
};
export default TariffItem;
