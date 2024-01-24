'use client';
import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { useTranslations } from 'use-intl';
import PlayerComponent from '../player/playerComponent';
import { ISerial, ISeries } from '@/interfaces';

const SeriesPageComponent = ({
    series,
    serial,
    seazonNumber,
}: {
    series: ISeries;
    serial: ISerial;
    seazonNumber: string;
}) => {
    const t = useTranslations('Media');
    return (
        <Flex flexDirection={'column'} alignItems={'center'}>
            <Flex flexDirection={['column', 'row']} alignItems={'center'} m={4} gap={5}>
                <Flex
                    minWidth={170}
                    maxWidth={170}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    border={'2px solid lightgrey'}
                    transition={'all 0.3s ease-in-out'}
                    height={250}
                >
                    <Image
                        priority
                        width='0'
                        height='0'
                        sizes='100vw'
                        style={{ width: '100%', height: '250px' }}
                        src={`${serial.posterUrl}`}
                        alt='poster'
                    />
                </Flex>
                <Flex flexDirection={'column'} maxWidth={500}>
                    <Heading mb={3}>{serial.name} </Heading>
                    <Text fontSize={18}>
                        {t('season')}: {seazonNumber} | {t('series')}: {series.number}
                    </Text>

                    <Text>{serial.description}</Text>
                    <Flex mt={3}>
                        <Text fontSize={20}>
                            {t('date')}: {serial.releaseDate}
                        </Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={1}>
                        <Text fontSize={20}>{t('rate')}:</Text>
                        <Text fontSize={20} fontWeight={'medium'}>
                            {serial.rate}
                        </Text>
                        <Icon boxSize={6} color={'orange'} as={AiFillStar} />
                    </Flex>
                </Flex>
            </Flex>
            <PlayerComponent
                videoUrl={series.videoUrl}
                enSubsUrl={series.enSubsUrl}
                ruSubsUrl={series.ruSubsUrl}
                zhSubsUrl={series.zhSubsUrl}
            />
        </Flex>
    );
};

export default SeriesPageComponent;
