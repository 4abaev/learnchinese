'use client';

import { Flex, Text } from '@chakra-ui/react';
import styles from '@/components/layout/header/index.module.css';

const AuthMenuItem = ({ onClick, text }: { onClick: () => void; text: string }) => {
    return (
        <Flex
            cursor={'pointer'}
            px={6}
            alignItems={'center'}
            h={'100%'}
            className={styles.main}
            onClick={onClick}
        >
            <Text fontSize={18}>{text}</Text>
        </Flex>
    );
};

export default AuthMenuItem;
