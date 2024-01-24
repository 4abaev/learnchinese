'use client';
import {
    Button,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'use-intl';
import { parseCookies } from 'nookies';
import { errorHandler } from '@/utils/errorHandler';
import { useActions, useAppSelector } from '@/state/store';
import { clearSucces } from '@/state/auth/slice';

const initialState = {
    password: '',
    passwordConfirmation: '',
};

const ResetPasswordForm = () => {
    const [show, setShow] = useState<boolean>(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [formValue, setFormValue] = useState(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { resetPassword } = useActions();
    const { isSuccess, error } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const dispatch = useDispatch();
    const handleFormChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormValue({
                ...formValue,
                [e.target.name]: e.target.value,
            });
        },
        [formValue]
    );
    const { NEXT_LOCALE } = parseCookies();
    const t = useTranslations('Auth');

    const handleSubmit = useCallback(async () => {
        setIsLoading(true);
        code && resetPassword({ code: code, ...formValue });
        setIsLoading(false);
    }, [formValue, resetPassword, code]);

    const handlePasswordConfirmationBlur = useCallback(() => {
        setPasswordMatchError(formValue.passwordConfirmation !== formValue.password);
    }, [formValue]);
    useEffect(() => {
        isSuccess && onOpen();
        dispatch(clearSucces());
    }, [dispatch, isSuccess, onOpen]);
    const handleClick = useCallback(() => setShow(!show), [show]);
    const isButtonEnabled = useMemo(() => {
        return (
            formValue.password === formValue.passwordConfirmation &&
            formValue.password &&
            formValue.passwordConfirmation
        );
    }, [formValue.password, formValue.passwordConfirmation]);
    return (
        <Flex flexDir={'column'} alignItems={'center'}>
            <Heading m={4}>{t('reset-password')}</Heading>

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
            <Input
                m={1}
                w={'100%'}
                name='passwordConfirmation'
                value={formValue.passwordConfirmation}
                onChange={handleFormChange}
                onBlur={handlePasswordConfirmationBlur}
                pr='2rem'
                type={'password'}
                placeholder={t('placeholder-confirm-password')}
            />
            {passwordMatchError && <Text color='red.500'>{t('password-match-error')}</Text>}
            <Button
                m={4}
                colorScheme={'green'}
                isDisabled={!isButtonEnabled}
                onClick={handleSubmit}
            >
                {isLoading ? <Spinner color={'white'} /> : <p>{t('change')}</p>}
            </Button>
            {error && <Text color={'red'}>{errorHandler(error, NEXT_LOCALE)}</Text>}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>{t('reset-password')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDir={'column'} alignItems={'center'}>
                        <Text textAlign={'center'}>{t('password-changed')}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            mx={'auto'}
                            colorScheme={'green'}
                            onClick={() => router.push('/auth/login')}
                        >
                            {t('login')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {!code && (
                <Modal isOpen={true} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader textAlign={'center'}>{t('error')}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text textAlign={'center'}>{t('page-for-reset')}</Text>
                            <Text textAlign={'center'}>{t('no-code')}</Text>
                            <Button
                                my={4}
                                mx={'auto'}
                                colorScheme={'green'}
                                onClick={() => router.push('/auth/forgot-password')}
                            >
                                {t('get')}
                            </Button>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Flex>
    );
};

export default ResetPasswordForm;
