'use client';
import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { useTranslations } from 'use-intl';
import PlayerComponent from '../player/playerComponent';
import { IMovie } from '@/interfaces';

const MoviePageComponent = ({ movie }: { movie: IMovie }) => {
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
                        src={`${movie.posterUrl}`}
                        alt='poster'
                    />
                </Flex>
                <Flex flexDirection={'column'} maxWidth={500}>
                    <Heading mb={3}>{movie.name} </Heading>
                    <Text>{movie.description}</Text>
                    <Flex mt={3}>
                        <Text fontSize={20}>
                            {t('date')}: {movie.releaseDate}
                        </Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={1}>
                        <Text fontSize={20}>{t('rate')}:</Text>
                        <Text fontSize={20} fontWeight={'medium'}>
                            {movie.rate}
                        </Text>
                        <Icon boxSize={6} color={'orange'} as={AiFillStar} />
                    </Flex>
                </Flex>
            </Flex>
            <PlayerComponent
                videoUrl={movie.videoUrl}
                enSubsUrl={movie.enSubsUrl}
                ruSubsUrl={movie.ruSubsUrl}
                zhSubsUrl={movie.zhSubsUrl}
            />
        </Flex>
    );
};

export default MoviePageComponent;
