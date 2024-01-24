'use client';
import { Box, Button, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import localFont from 'next/font/local';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { useTranslations } from 'use-intl';
import { IMovie } from '@/interfaces';
import AuthModal from '@/components/auth/authModal';

const helvetica = localFont({
    src: '../../../fonts/helvetica_regular.otf',
    display: 'swap',
});

const Poster: React.FC<IMovie> = ({ posterUrl, releaseDate, name, rate, id }) => {
    const [showInfo, setShowInfo] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Media');
    const handleMouseEnter = () => {
        setShowInfo(true);
    };
    const handleClick = () => {
        router.push(`${pathname}/${id}`);
    };
    const handleMouseLeave = () => {
        setShowInfo(false);
    };
    const rateClass = rate < 5 ? 'red' : rate < 8 ? 'orange' : 'yellow';
    return (
        <Flex maxW={200} minW={200} flexDir={'column'} display={'inline-flex'}>
            <Flex
                justifyContent={'center'}
                flexDirection={'column'}
                position={'relative'}
                border={'2px solid lightgrey'}
                m={4}
                mb={0}
                cursor={'pointer'}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    priority
                    width='0'
                    height='0'
                    sizes='100vw'
                    style={{ width: '100%', height: '250px' }}
                    src={`${posterUrl}`}
                    alt='poster'
                />
                {showInfo && (
                    <Flex
                        p={2}
                        position={'absolute'}
                        flexDir={'column'}
                        justifyContent={'space-between'}
                        height={'100%'}
                        width={'100%'}
                        transition={'all .3s ease-in-out'}
                        _hover={{ bgColor: 'rgba(0,0,0,0.7)' }}
                        bgColor={'rgba(0,0,0,0)'}
                    >
                        <Flex justifyContent={'space-between'}>
                            <Flex gap={1} alignItems={'center'} height={'30px'}>
                                <Icon color={'white'} as={BsFillCalendarDateFill} />
                                <Text color={'white'}>{releaseDate.split('-')[0]}</Text>
                            </Flex>
                            <Flex gap={1} alignItems={'center'} height={'30px'}>
                                <Icon color={'yellow'} as={AiFillStar} />
                                <Text color={rateClass}>{rate}</Text>
                            </Flex>
                        </Flex>
                        <Flex justifyContent={'center'}>
                            <Button colorScheme={'green'}>{t('learn')}</Button>
                        </Flex>
                        <Box>
                            <Text
                                textAlign={'center'}
                                color={'white'}
                                className={helvetica.className}
                                fontSize={18}
                                noOfLines={3}
                            >
                                {name}
                            </Text>
                        </Box>
                    </Flex>
                )}
            </Flex>
            <Text
                textAlign={'center'}
                m={4}
                mt={0}
                className={helvetica.className}
                fontSize={18}
                noOfLines={1}
            >
                {name}
            </Text>
            <AuthModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default Poster;
