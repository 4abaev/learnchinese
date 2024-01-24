'use client';
import {
    Button,
    Flex,
    Heading,
    Input,
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
import { useDispatch } from 'react-redux';
import { useTranslations } from 'use-intl';
import { parseCookies } from 'nookies';
import { errorHandler } from '@/utils/errorHandler';
import { useActions, useAppSelector } from '@/state/store';
import { clearSucces } from '@/state/auth/slice';

const initialState = {
    email: '',
};

const ForgotPasswordForm = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { forgotPassword } = useActions();
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
        forgotPassword(formValue);
        setIsLoading(false);
    }, [formValue, forgotPassword]);

    useEffect(() => {
        isSuccess && onOpen();
        dispatch(clearSucces());
    }, [isSuccess, onOpen, dispatch]);

    const isButtonEnabled = useMemo(() => {
        return !!formValue.email;
    }, [formValue.email]);

    return (
        <Flex flexDir={'column'} alignItems={'center'}>
            <Heading m={4}>{t('reset-password')}</Heading>

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
            <Button
                m={4}
                colorScheme={'green'}
                isDisabled={!isButtonEnabled}
                onClick={handleSubmit}
            >
                {isLoading ? <Spinner color={'white'} /> : <p>{t('submit')}</p>}
            </Button>
            {error && <Text color={'red'}>{errorHandler(error, NEXT_LOCALE)}</Text>}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>{t('reset-password')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textAlign={'center'}>{t('mail-sent')}</Text>
                        <Text textAlign={'center'}>{t('mail-spam')}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            {t('close')}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ForgotPasswordForm;
