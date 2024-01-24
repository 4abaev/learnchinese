'use client';
import {
    Box,
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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'use-intl';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { errorHandler } from '@/utils/errorHandler';
import { useActions, useAppSelector } from '@/state/store';
import { clearSucces } from '@/state/auth/slice';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const RegisterForm = ({onRegisterModalClose}: {onRegisterModalClose?:()=>void}) => {
    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formValue, setFormValue] = useState(initialState);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const { register } = useActions();
    const { isSuccess, error } = useAppSelector((state) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        await register(formValue);
        setIsLoading(false);
    }, [formValue, register]);

    const handleCloseModals = useCallback(async ()=>{
        onClose();
        if(onRegisterModalClose&&typeof onRegisterModalClose==='function'){
            onRegisterModalClose();
        }
    },[onClose, onRegisterModalClose]);

    useEffect(() => {
        isSuccess && onOpen();
        dispatch(clearSucces());
    }, [dispatch, isSuccess, onOpen]);

    const handleClick = useCallback(() => setShow(!show), [show]);

    const handleConfirmPasswordBlur = useCallback(() => {
        setPasswordMatchError(formValue.confirmPassword !== formValue.password);
    }, [formValue]);

    const isRegistrationEnabled = useMemo(() => {
        return (
            formValue.password === formValue.confirmPassword &&
            !!formValue.email &&
            !!formValue.username
        );
    }, [formValue.password, formValue.confirmPassword, formValue.email, formValue.username]);
    return (
        <Flex flexDir={'column'} alignItems={'center'}>
            <Heading m={4}>{t('registration')}</Heading>
            <Input
                m={1}
                w={'100%'}
                name='username'
                value={formValue.username}
                onChange={handleFormChange}
                pr='2rem'
                type={'text'}
                placeholder={t('placeholder-login')}
            />
            <Input
                m={1}
                w={'100%'}
                name='email'
                value={formValue.email}
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
            <Input
                m={1}
                w={'100%'}
                name='confirmPassword'
                value={formValue.confirmPassword}
                onChange={handleFormChange}
                onBlur={handleConfirmPasswordBlur}
                pr='2rem'
                type={'password'}
                placeholder={t('placeholder-confirm-password')}
            />
            {passwordMatchError && <Text color='red.500'>{t('password-match-error')}</Text>}
            <Box display={'flex'} flexDir={'column'} alignItems={'center'} width={['370px', '450px']} wordBreak={'break-all'} fontSize={'14px'}>
                <Text opacity={'0.7'}>{t('privacy-title')}</Text>
                <Link href={'https://showchinese.ru/info/privacy'} rel='noopener noreferrer' target='_blank'>
                    <Text opacity={'0.7'} _hover={{ color: 'green'}} mt={['-21px', 0]} mr={['-75px', 0]}>{t('privacy-text')}</Text>
                </Link>
            </Box>
            <Button
                m={4}
                colorScheme={'green'}
                isDisabled={!isRegistrationEnabled}
                onClick={handleSubmit}
            >
                {isLoading ? <Spinner color={'white'} /> : <p>{t('register')}</p>}
            </Button>
            {error && <Text color={'red'}>{errorHandler(error, NEXT_LOCALE)}</Text>}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>{t('registration')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading m={3} textAlign={'center'}>
                            {t('registered')}
                        </Heading>
                        <Text textAlign={'center'}>{t('verify')}</Text>
                        <Text textAlign={'center'}>
                            {t('verify-mail')}
                        </Text>
                        <Text textAlign={'center'}>
                            {t('mail-spam')}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCloseModals}>
                            {t('close')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default RegisterForm;
