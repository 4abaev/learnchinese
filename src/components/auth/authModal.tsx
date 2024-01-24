'use client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslations } from 'use-intl';
import { AiFillHome } from 'react-icons/ai';

const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
    const router = useRouter();
    const t = useTranslations('Auth');
    const handleOnClick = useCallback(
        (path: string) => {
            router.push(path);
        },
        [router]
    );
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('auth-for-see-title')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{t('auth-for-see-body')}</ModalBody>

                <ModalFooter display={'flex'} justifyContent={'space-between'}>
                    <Button colorScheme='green' mr={3} onClick={() => handleOnClick('/movies')}>
                        <Icon mr={2} color={'white'} boxSize={6} as={AiFillHome} />
                        {t('go-home')}
                    </Button>
                    <Button colorScheme='green' onClick={() => handleOnClick('/auth/login')}>
                        {t('go-login')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
