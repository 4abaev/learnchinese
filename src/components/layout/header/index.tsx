'use client';
import { Flex, Heading, Icon, Text, useMediaQuery } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { AiFillBook, AiFillHome, AiOutlineQuestionCircle, AiFillVideoCamera } from 'react-icons/ai';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import styles from './index.module.css';
import { useActions, useAppSelector } from '@/state/store';
import LogoIcon from '@/icons/logo';
import BurgerMenu from '@/components/layout/header/items/burgerMenu';
import AuthMenuItem from '@/components/layout/header/items/authMenuItem';
import MenuItem from '@/components/layout/header/items/menuItem';
import VideoModal from '@/components/videoModal';
import { IGlobalFields } from '@/interfaces/globalFields';

export const navLinks = [
    {
        path: '/movies',
        title: 'movies',
    },
    {
        path: '/cartoons',
        title: 'cartoons',
    },
    {
        path: '/serials',
        title: 'serials',
    },
    {
        path: '/profile/dictionary',
        title: 'dictionary',
    },
    {
        path: '/info/guide',
        title: 'help',
    },
];
const Header = ({fields}: {fields?: IGlobalFields}) => {
    // const showBurgerMenu = useBreakpointValue({ base: true, md: false });
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const { getMe } = useActions();
    const t = useTranslations('Layout');
    const videoUrl = fields?.data?.attributes?.guide_video;

    useEffect(() => {
        if (!loading) {
            !user && getMe();
            setLoading(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickHome = useCallback(() => router.push('/movies'), [router]);
    const handleClickProfile = useCallback(() => router.push('/profile'), [router]);
    const handleClickDictionary = useCallback(() => router.push('/profile/dictionary'), [router]);
    const handleClickGuide = useCallback(() => router.push('/info/guide'), [router]);
    const handleClickLogin = useCallback(() => router.push('/auth/login'), [router]);

    return (
        <Flex
            userSelect={'none'}
            className={styles.header}
            height={'60px'}
            width={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            pl={{ base: 2, md: 8 }}
            gap={[2, 4, 4]}
        >
            <Flex gap={[3, 6, 1]} h={'100%'}>
                <Flex gap={[2, 4, 6]} h={'100%'} className={styles.logo_home_box}>
                    <Flex
                        className={styles.logo}
                        cursor={'pointer'}
                        gap={2}
                        alignItems={'center'}
                        h={'100%'}
                        onClick={handleClickHome}
                    >
                        <Heading fontSize={[20, 28]}>Show</Heading>
                        <Icon width={['36pt', '48pt']} height={['18pt', '24pt']} as={LogoIcon} />
                        <Heading fontSize={[20, 28]}>Chinese</Heading>
                    </Flex>

                    <Flex
                        className={styles.home}
                        cursor={'pointer'}
                        transition={'all .3s ease-in-out'}
                        px={2}
                        alignItems={'center'}
                        h={'100%'}
                        gap={1}
                        onClick={handleClickHome}
                    >
                        <Icon color={'white'} boxSize={6} as={AiFillHome} />
                        <Text fontSize={24} className={styles.homeText}>
                            {t('home')}
                        </Text>
                    </Flex>
                </Flex>
                {isLargerThan768 && (
                    <>
                        {user && (
                            <MenuItem
                                onClick={handleClickDictionary}
                                text={t('dictionary')}
                                IconAs={AiFillBook}
                            />
                        )}

                        <MenuItem
                            onClick={handleClickGuide}
                            text={t('help')}
                            IconAs={AiOutlineQuestionCircle}
                        />
                        <VideoModal videoUrl={videoUrl} >
                        <MenuItem
                            text={t('guideVideo')}
                          IconAs={AiFillVideoCamera}
                        />
                        </VideoModal>
                    </>
                    
                )}
            </Flex>
            {!isLargerThan768 ? null : user ? (
                <AuthMenuItem onClick={handleClickProfile} text={user.username} />
            ) : (
                <AuthMenuItem onClick={handleClickLogin} text={t('auth')} />
            )}
            {!isLargerThan768 && <BurgerMenu videoUrl={videoUrl} user={user} />}
        </Flex>
    );
};

export default Header;
