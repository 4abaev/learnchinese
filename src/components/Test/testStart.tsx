'use client';
import { useCallback } from 'react';
import {
    Button,
    Flex,
    Heading,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'use-intl';
import { useSessionStorage } from 'usehooks-ts';
import { Answer } from '@/components/Test/TestComponent';
import { useAppSelector } from '@/state/store';

const TestStart = () => {
    const router = useRouter();
    const t = useTranslations('Test');
    const [answers, setAnswers] = useSessionStorage<Answer[]>('answers', []);
    const { words } = useAppSelector((state) => state.dictionary);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOnClick = useCallback(() => {
        if (words.length >= 5) {
            router.push('/profile/test');
            setAnswers([]);
        } else {
            onOpen();
        }

    }, [onOpen, words.length, setAnswers, router]);
    return (
        <Flex
            flexDir={'column'}
            alignItems={'center'}
            m={4} p={2}
            border={'2px solid #72b172'}
            borderRadius={5}
        >
            <Heading textAlign={'center'} fontSize={22}>{t('test-start-h')}</Heading>
            <Text my={4} textAlign={'center'}>{t('test-start-p')}</Text>
            <Button colorScheme={'green'} onClick={handleOnClick}>{t('test-start-button')}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={'center'}>{t('warn')}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text textAlign={'center'}>{t('warn-p')}</Text>
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
export default TestStart;