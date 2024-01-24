'use client';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslations } from 'use-intl';

const VerifyInfo = () => {
    const router = useRouter();
    const t = useTranslations('Auth');
    const handleOnClick = useCallback(() => {
        router.push('/auth/login');
    }, [router]);
    return (
        <Flex flexDir={'column'} alignItems={'center'}>
            <Text m={4} fontSize={20}>
                {t('verify-success')}
            </Text>
            <Button m={2} colorScheme={'green'} onClick={handleOnClick}>
                {t('login')}
            </Button>
        </Flex>
    );
};

export default VerifyInfo;
