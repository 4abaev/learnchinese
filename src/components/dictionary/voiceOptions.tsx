import React, { useCallback } from 'react';
import {
    Button, Flex, Grid,
    Heading,
} from '@chakra-ui/react';
import { useTranslations } from 'use-intl';


interface AudioSettingsControllerProps {
    speakingRate: number;
    // eslint-disable-next-line no-unused-vars
    setSpeakingRate: (speakingRate: number) => void;
}

function AudioSettingsController({ speakingRate, setSpeakingRate }: AudioSettingsControllerProps) {
    const handleSpeakingRateChange = useCallback((value: number) => {
        setSpeakingRate(value);
    }, [setSpeakingRate]);
    const speakingRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

    const t = useTranslations('Dictionary');
    return (
        <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
            <Heading textAlign={'center'}>{t('speed')}</Heading>
            <Grid templateColumns={'repeat(4, 1fr)'} gap={2} mt={3}>
                {speakingRates.map((rate, index) => (
                    <Button
                        key={index}
                        onClick={() => handleSpeakingRateChange(rate)}
                        colorScheme={speakingRate === rate ? 'green' : 'gray'}
                    >
                        {rate}
                    </Button>
                ),
                )}
            </Grid>
        </Flex>
    );
}

export default AudioSettingsController;