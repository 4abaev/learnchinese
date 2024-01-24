'use client';

import { Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import styles from '@/components/layout/header/index.module.css';

const MenuItem = ({
    onClick,
    text,
    IconAs,
}: {
    onClick?: () => void;
    text: string;
    IconAs?: IconType;
}) => {
    return (
        <Flex
            className={styles.main}
            cursor={'pointer'}
            transition={'all .3s ease-in-out'}
            px={2}
            alignItems={'center'}
            h={'100%'}
            gap={1}
            onClick={onClick}
        >
            {IconAs && <Icon mt={1} color={'white'} boxSize={6} as={IconAs} />}
            <Text className={styles.navbarItemText} fontSize={[20, 20, 20, 20]}>{text}</Text>
        </Flex>
    );
};

export default MenuItem;
