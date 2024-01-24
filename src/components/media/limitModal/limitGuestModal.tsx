import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useCallback } from 'react';
import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';

const LimitGuestModal = ({ isOpen }: { isOpen: boolean }) => {
    const router = useRouter();
    const t = useTranslations('Limit');
    const handleOnClick = useCallback(
        (path: string) => {
            router.push(path);
        },
        [router]
    );
    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t('subscribe-for-see-title')}</ModalHeader>
                <ModalBody>{t('subscribe-for-guest-see-body')}</ModalBody>

                <ModalFooter display={'flex'} justifyContent={'space-between'}>
                    <Button colorScheme={'green'} mr={3} onClick={() => handleOnClick('/movies')}>
                        <Icon mr={2} color={'white'} boxSize={6} as={AiFillHome} />
                        {t('go-home')}
                    </Button>
                    <Button colorScheme={'green'} onClick={() => handleOnClick('/auth/register')}>
                        {t('go-register')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LimitGuestModal;
