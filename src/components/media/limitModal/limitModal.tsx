'use client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useTranslations } from 'use-intl';
import { AiFillHome } from 'react-icons/ai';

const LimitModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
    const router = useRouter();
    const t = useTranslations('Limit');
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
                <ModalHeader>{t('subscribe-for-see-title')}</ModalHeader>
                <ModalBody>{t('subscribe-for-see-body')}</ModalBody>

                <ModalFooter display={'flex'} justifyContent={'space-between'}>
                    <Button colorScheme='green' mr={3} onClick={() => handleOnClick('/movies')}>
                        <Icon mr={2} color={'white'} boxSize={6} as={AiFillHome} />
                        {t('go-home')}
                    </Button>
                    <Button
                        colorScheme='green'
                        onClick={() => handleOnClick('/profile/subscription')}
                    >
                        {t('go-subscribe')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LimitModal;
