'use client';
import { Box, Flex, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import styles from './index.module.css';

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
];

const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('Layout');
    return (
        <Box
            className={styles.linkContainer}
            height={'35px'}
            my={4}
            mx={'auto'}
            width={'max-content'}
            display={'flex'}
            justifyContent={'space-between'}
        >
            <Flex h={'100%'} borderRadius={'10px'}>
                {navLinks.map((link) => (
                    <Flex
                        className={pathname.includes(link.path) ? styles.linkActive : styles.link}
                        key={link.path}
                        cursor={'pointer'}
                        boxShadow={'xs'}
                        transition={'all .3s ease-in-out'}
                        px={2}
                        alignItems={'center'}
                        h={'100%'}
                        onClick={() => router.push(link.path)}
                    >
                        <Text fontSize={20}>{t(link.title)}</Text>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default NavBar;
