'use client';
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Text,
    Flex,
    Button,
    Heading,
    Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useTranslations } from 'use-intl';
import { ISerial } from '@/interfaces';

const SerailPageComponent = ({ serial }: { serial: ISerial }) => {
    const router = useRouter();
    const handleEpisodeClick = (seasonNumber: number, episodeNumber: number) => {
        const url = `/serials/${serial.id}/${seasonNumber}/${episodeNumber}`;
        router.push(url);
    };
    const [selectedSeason, setSelectedSeason] = useState<number>(1);
    const t = useTranslations('Media');
    const createHandleSeasonClick = useCallback(
        (seasonNumber: number) => {
            return () => {
                setSelectedSeason(seasonNumber);
            };
        },
        [setSelectedSeason]
    );
    return (
        <Box m={2}>
            <Heading textAlign={'center'} m={2}>
                {serial.name}{' '}
            </Heading>
            <Tabs mt={4} maxW={400} isFitted>
                <TabList>
                    {serial.Seazon.map((season) => (
                        <Tab
                            key={season.number}
                            onClick={createHandleSeasonClick(season.number)}
                            _selected={{ color: 'white', bg: 'blue.500' }} // Стили для активной вкладки
                        >
                            {t('season')} {season.number}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {serial.Seazon.map((season) => (
                        <TabPanel key={season.number} p={0}>
                            {season.number === selectedSeason && (
                                <div>
                                    {season.Series.map((series, index) => (
                                        <Flex
                                            mb={0.5}
                                            minW={'100%'}
                                            h={'50px'}
                                            justifyContent='space-between'
                                            key={index}
                                            pl={2}
                                            alignItems={'center'}
                                            width='max-content'
                                            gap={12}
                                            bgColor={index % 2 === 0 ? 'lightgray' : 'grey'} // Альтернативные стили для каждой второй серии
                                        >
                                            <Text fontSize={20}>
                                                {t('series')} {series.number}
                                            </Text>
                                            <Button
                                                colorScheme='green'
                                                h={'50px'}
                                                onClick={() =>
                                                    handleEpisodeClick(season.number, series.number)
                                                }
                                                height={'100%'}
                                                borderRadius={0}
                                            >
                                                {t('learn')}
                                            </Button>
                                        </Flex>
                                    ))}
                                </div>
                            )}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default SerailPageComponent;
