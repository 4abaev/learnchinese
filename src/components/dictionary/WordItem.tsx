'use client';
import { useCallback, useState, useRef, useMemo } from 'react';
import {
    Button,
    Checkbox,
    Icon,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Td,
    Tr,
} from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { AiFillDelete } from 'react-icons/ai';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import axios from 'axios';
import { useSessionStorage } from 'usehooks-ts';
import { IWord } from '@/api/dictionary';
import { useActions } from '@/state/store';

const API_URL = process.env.NEXT_PUBLIC_GOOGLE_TTS_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const URL = `${API_URL}?key=${API_KEY}`;

const WordItem = ({ word, isRu, speakingRate }: { word: IWord, isRu: boolean, speakingRate: number }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { deleteWord } = useActions();
    const [disableModal, setDisableModal] = useSessionStorage('disableModal', false);
    const [showModal, setShowModal] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const config = useMemo(() => {
        return {
            input: {
                text: word.wordOnChinese,
            },
            voice: {
                languageCode: 'zh',
            },
            audioConfig: {
                audioEncoding: 'MP3',
                speakingRate: Number(speakingRate),
                pitch: 1,
            },
        };
    }, [speakingRate, word.wordOnChinese]);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const speakWord = useCallback(async () => {
        const { audioContent } = (await axios.post(URL, config)).data;

        if (audioRef.current) {
            audioRef.current.src = `data:audio/mpeg;base64,${audioContent}`;
            audioRef.current.load();
            audioRef.current.play();
            setIsSpeaking(true);
            audioRef.current.addEventListener('ended', () => {
                setIsSpeaking(false);
            });
        }
    }, [config]);

    const handleDeleteWord = useCallback(async (word: IWord) => {
        setIsLoading(true);
        word.id && await deleteWord(word.id);
        setIsLoading(false);
    }, [deleteWord]);

    const handleToggleModal = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal]);

    const handleCheckboxChange = useCallback(() => {
        setDisableModal(!disableModal);
    }, [setDisableModal, disableModal]);

    const controls = useAnimation();

    const shakeAnimation = useCallback(async () => {
        await controls.start({
            x: [0, -2, 2, -2, 2, 0],
        });
    }, [controls]);
    return (
        <Tr>
            <Td p={[1, 4]} fontSize={[14, 18]}>{word.wordOnChinese}</Td>
            <Td p={[1, 4]} fontSize={[14, 18]}>{word.pinyin}</Td>
            <Td p={[1, 4]} fontSize={[14, 18]}>
                {isRu ? word.wordOnRu : word.wordOnEn}
            </Td>
            <Td p={[1, 4]} maxWidth={10} textAlign={'center'}>
                {isSpeaking ? <Icon boxSize={[5, 8]} cursor={'pointer'} as={AiFillPauseCircle} />
                    :
                    <Icon onClick={speakWord} cursor={'pointer'} boxSize={[5, 8]} as={AiFillPlayCircle} />}
                <audio ref={audioRef} />
            </Td>
            <Td p={[1, 4]} maxWidth={10}>
                {isLoading ? <Spinner size='sm' cursor={'pointer'} color={'red'} mx={'auto'} /> :
                    <motion.div
                    animate={controls}
                    whileHover={{ rotate: 0 }}
                    onHoverStart={() => {
                            shakeAnimation();
                        }}
                    >
                    <Icon
                            boxSize={6}
                            color={'red'}
                            mx={'auto'}
                            cursor={'pointer'}
                            as={AiFillDelete}
                            onClick={() => {
                                disableModal ? handleDeleteWord(word) : handleToggleModal();
                            }}
                        />
                </motion.div>}
            </Td>
            <Modal isOpen={showModal} onClose={handleToggleModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Удалить слово</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Вы уверены, что хотите удалить это слово?
                        <Checkbox mt={8} onChange={handleCheckboxChange}>Больше не показывать это сообщение</Checkbox>
                    </ModalBody>
                    <ModalFooter>

                        <Button colorScheme={'red'} onClick={() => {
                            handleDeleteWord(word);
                            handleToggleModal();
                        }}>
                            Удалить
                        </Button>
                        <Button variant={'ghost'} onClick={handleToggleModal}>
                            Отмена
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Tr>
    );
};

export default WordItem;
