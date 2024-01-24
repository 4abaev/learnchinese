'use client';
import {
    Button,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useTranslations } from 'use-intl';
import { parseCookies } from 'nookies';
import { errorHandler } from '@/utils/errorHandler';
import { useActions, useAppSelector } from '@/state/store';

const initialState = {
    identifier: '',
    password: '',
};

const LoginForm = () => {
    const [show, setShow] = useState<boolean>(false);
    const [formValue, setFormValue] = useState(initialState);
    const { login } = useActions();
    const { isSuccess, error, isLoading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const handleFormChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
                ...formValue,
                [e.target.name]: e.target.value,
            });
        },
        [formValue]
    );
    const t = useTranslations('Auth');
    const handleSubmit = useCallback(async () => {
        login(formValue);
    }, [formValue, login]);
    const { NEXT_LOCALE } = parseCookies();

    useEffect(() => {
        isSuccess && !isLoading && (window.location.href = '/movies');
    }, [isSuccess, router, isLoading]);

    const handleClick = useCallback(() => setShow(!show), [show]);

    const isButtonEnabled = useMemo(() => {
        return !!formValue.identifier && !!formValue.password;
    }, [formValue.password, formValue.identifier]);

    return (
        <Flex flexDir={'column'} alignItems={'center'}>
            <Heading m={4}> {t('authorization')}</Heading>
            <Input
                m={1}
                w={'100%'}
                name='identifier'
                value={formValue.identifier}
                onChange={handleFormChange}
                pr='2rem'
                type={'email'}
                placeholder={t('placeholder-email')}
            />
            <InputGroup justifyContent={'space-between'} size='md' m={1}>
                <Input
                    w={'100%'}
                    name='password'
                    value={formValue.password}
                    onChange={handleFormChange}
                    pr='2rem'
                    type={show ? 'text' : 'password'}
                    placeholder={t('placeholder-password')}
                />
                <InputRightElement>
                    <Button height={'95%'} bg={'transparent'} size='sm' onClick={handleClick}>
                        {show ? <Icon as={AiFillEye} /> : <Icon as={AiFillEyeInvisible} />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Flex w={'100%'} justifyContent={'space-between'}>
                <Link href={'/auth/register'}>
                    <Text
                        textDecorationColor={'transparent'}
                        transition={'all .5s ease-in-out'}
                        colorScheme='gray'
                        _hover={{ textDecorationColor: 'black', textDecoration: 'underline' }}
                        fontSize={14}
                    >
                        {t('register')}
                    </Text>
                </Link>
                <Link href={'/auth/forgot-password'}>
                    <Text
                        textDecorationColor={'transparent'}
                        transition={'all .5s ease-in-out'}
                        colorScheme='gray'
                        _hover={{ textDecorationColor: 'black', textDecoration: 'underline' }}
                        fontSize={14}
                    >
                        {t('forgot-password')}
                    </Text>
                </Link>
            </Flex>
            <Button
                m={4}
                width={'100px'}
                colorScheme={'green'}
                isDisabled={!isButtonEnabled}
                onClick={handleSubmit}
            >
                {isLoading ? <Spinner color={'white'} /> : <p>{t('login')}</p>}{' '}
            </Button>
            {error && <Text color={'red'}>{errorHandler(error, NEXT_LOCALE)}</Text>}
        </Flex>
    );
};

export default LoginForm;
