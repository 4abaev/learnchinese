'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import axios from 'axios';
import { Box, Icon, Spinner, useDisclosure } from '@chakra-ui/react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { getCookie, setCookie } from 'cookies-next';
import styles from './player.module.css';
import { useActions, useAppSelector } from '@/state/store';
import LimitModal from '@/components/media/limitModal/limitModal';
import PopupCard from '@/components/media/player/popupCard';
import ControlsPanel from '@/components/media/player/controlsPanel';
import LimitGuestModal from '@/components/media/limitModal/limitGuestModal';

export enum Languages {
    ru = 'ru',
    en = 'en',
    zh = 'zh',
}

type Subtitle = {
    id: string;
    startTime: string;
    startSeconds: number;
    endTime: string;
    endSeconds: number;
    text: string | string[];
};

type PlayerProps = {
    ruSubsUrl: string;
    enSubsUrl: string;
    zhSubsUrl: string;
    videoUrl: string;
};

type LimitData = {
    limitedTime: string;
    limitedWords: string;
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_URL;

const MAX_WATCH_TIME = 4 * 60;
const LIMITED_WORDS_COUNT = 10;
const MAX_AGE_COOKIE = 24 * 60 * 60;
const KEY_COOKIE_LIMIT = 'daily_limit';

const PlayerComponent: React.FC<PlayerProps> = ({ videoUrl, enSubsUrl, ruSubsUrl, zhSubsUrl }) => {
    const [subtitlesRu, setSubtitlesRu] = useState<Subtitle[]>([]);
    const [subtitlesEn, setSubtitlesEn] = useState<Subtitle[]>([]);
    const [subtitlesZh, setSubtitlesZh] = useState<Subtitle[]>([]);
    useEffect(() => {
        const fetchSubtitles = async () => {
            try {
                const ruResponse = await axios.get(ruSubsUrl);
                const enResponse = await axios.get(enSubsUrl);
                const zhResponse = await axios.get(zhSubsUrl);

                setSubtitlesRu(ruResponse.data);
                setSubtitlesEn(enResponse.data);
                setSubtitlesZh(zhResponse.data);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching subtitles:', error);
            }
        };
        fetchSubtitles();
    }, [ruSubsUrl, enSubsUrl, zhSubsUrl]);

    const { limitWord, limitWatch, getDictionary } = useActions();
    const { isError, watchLimit, translateLimit } = useAppSelector((state) => state.limit);
    const { user } = useAppSelector((state) => state.auth);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isGuestOpen, onOpen: onGuestOpen } = useDisclosure();

    const playerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const rangeRef = useRef<HTMLInputElement | null>(null);

    const [lastTime, setLastTime] = useState<number>(0);

    const [limitedWords, setLimitedWords] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [currentSubtitle, setCurrentSubtitle] = useState<string | string[] | null>(null);
    const [secondSubtitle, setSecondSubtitle] = useState<string | string[] | null>(null);
    const [clickedSymbol, setClickedSymbol] = useState<any>(null);
    const [translatedRu, setTranslatedRu] = useState<string | null>(null);
    const [translatedEn, setTranslatedEn] = useState<string | null>(null);
    const [pinyin, setPinyin] = useState<string | null>(null);
    const [currentLanguage, setCurrentLanguage] = useSessionStorage<Languages>(
        'currLang',
        Languages.zh
    );

    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [isTranslateLoading, setTranslateLoading] = useState<boolean>(true);

    const [isLimitReached, setIsLimitReached] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);

    const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);

    const [userAgentIos, setUserAgentIos] = useState<boolean>(false);
    const [userAgentPhone, setUserAgentPhone] = useState<boolean>(false);

    const subtitles = useMemo(() => {
        switch (currentLanguage) {
        case Languages.ru:
            return subtitlesRu;
        case Languages.en:
            return subtitlesEn;
        case Languages.zh:
            return subtitlesZh;
        default:
            return subtitlesZh;
        }
    }, [currentLanguage, subtitlesEn, subtitlesRu, subtitlesZh]);

    useEffect(() => {
        if (isError && watchLimit !== null && watchLimit <= 0) {
            onOpen();
            videoRef.current && videoRef.current.pause();
            setInterval(() => {
                window.location.href = '/profile/subscription';
            }, 4000);
        }
        if (isError && translateLimit !== null && translateLimit <= 0) {
            setIsLimitReached(true);
        }
    }, [isError, watchLimit, translateLimit, onOpen, isLimitReached]);

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying && !videoRef.current.paused) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    useEffect(() => {
        if (user) {
            getDictionary();
        }
    }, [user, getDictionary]);
    const { isAddError } = useAppSelector((state) => state.limit);
    const addWordModal = useDisclosure();

    useEffect(() => {
        isAddError && addWordModal.onOpen();
    }, [isAddError, addWordModal]);

    const hasActiveSubscription = useMemo(() => {
        return user?.subscriptions.some((subscription) => subscription.isActive);
    }, [user?.subscriptions]);

    useEffect(() => {
        if (!user) {
            const cookieData = getCookie(KEY_COOKIE_LIMIT);
            if (cookieData) {
                const { limitedTime, limitedWords } = JSON.parse(cookieData) as LimitData;
                const limitedTimeParsed: number = parseInt(limitedTime || '0', 10);
                const limitedWordsParsed: number = parseInt(limitedWords || '0', 10);
                setElapsedTime(limitedTimeParsed);
                setLimitedWords(limitedWordsParsed);
            }
        }
    }, [user]);

    const handleSaveCookieLimit = useCallback(() => {
        const data: string = JSON.stringify({
            limitedWords: limitedWords.toString(),
            limitedTime: elapsedTime.toString(),
        } as LimitData);
        setCookie(KEY_COOKIE_LIMIT, data, {
            maxAge: MAX_AGE_COOKIE,
            path: '/',
        });
    }, [elapsedTime, limitedWords]);

    useEffect(() => {
        if (!user && (elapsedTime > 0 || limitedWords > 0)) {
            handleSaveCookieLimit();
        }
    }, [elapsedTime, handleSaveCookieLimit, limitedWords, user]);

    const handleGuestLimit = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            onGuestOpen();
        }
    }, [onGuestOpen]);

    useEffect(() => {
        if (
            !user &&
            elapsedTime >= MAX_WATCH_TIME &&
            !hasActiveSubscription &&
            isPlaying &&
            !isVideoLoading
        ) {
            handleGuestLimit();
        }
    }, [elapsedTime, handleGuestLimit, hasActiveSubscription, isPlaying, isVideoLoading, user]);

    const handleTimeUpdate = useCallback(async () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);

            if (Math.floor(videoRef.current.currentTime) - lastTime >= 5) {
                setElapsedTime((prev) => prev + 5);
                setLastTime(Math.floor(videoRef.current.currentTime));
            }

            if (
                user &&
                elapsedTime >= 60 &&
                !hasActiveSubscription &&
                isPlaying &&
                !isVideoLoading
            ) {
                limitWatch();
                setElapsedTime(0);
            }
            const currentSub = subtitlesZh.find(
                (sub: Subtitle) => currentTime >= sub.startSeconds && currentTime <= sub.endSeconds
            );
            const currentSecondSub = subtitles.find(
                (sub) => currentTime >= sub.startSeconds && currentTime <= sub.endSeconds
            );

            if (currentSub) {
                setCurrentSubtitle(currentSub.text);
                currentSecondSub && setSecondSubtitle(currentSecondSub.text);
            } else {
                setCurrentSubtitle('');
                setSecondSubtitle('');
            }
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, subtitles, subtitlesZh]);

    const subtitleChars = useMemo(() => {
        if (Array.isArray(currentSubtitle)) {
            return currentSubtitle.map((char, index) => <p key={index}>{char}</p>);
        } else if (typeof currentSubtitle === 'string') {
            return currentSubtitle.split('').map((char, index) => <p key={index}>{char}</p>);
        } else {
            return null;
        }
    }, [currentSubtitle]);
    const subtitleSecondChars = useMemo(() => {
        if (Array.isArray(secondSubtitle)) {
            return secondSubtitle.map((char, index) => <p key={index}>{char}</p>);
        } else if (typeof secondSubtitle === 'string') {
            return secondSubtitle.split('').map((char, index) => <p key={index}>{char}</p>);
        } else {
            return null;
        }
    }, [secondSubtitle]);

    const handleClose = useCallback(async (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        setClickedSymbol(null);
        setTranslatedRu(null);
        setTranslatedEn(null);
        setPinyin(null);
    }, []);

    const translate = useCallback(
        async (text: string) => {
            const urlRu = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(
                text
            )}&source=zh-CN&target=ru`;
            const urlEn = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(
                text
            )}&source=zh-CN&target=en`;

            try {
                if (user && !hasActiveSubscription) {
                    limitWord();
                } else if (!user) {
                    setLimitedWords((prevState) => prevState + 1);
                }

                if (!isError) {
                    setTranslateLoading(true);
                    const resRu = await axios.post(urlRu);
                    const resEn = await axios.post(urlEn);
                    const resPinyin = await axios.post(
                        `${process.env.NEXT_PUBLIC_FRONT_URL}/ru/api`,
                        {
                            text,
                        }
                    );
                    setTranslatedRu(resRu.data.data.translations[0].translatedText);
                    setTranslatedEn(resEn.data.data.translations[0].translatedText);
                    const pinyinString = resPinyin.data.map((item: any) => item.join('')).join(' ');
                    setPinyin(pinyinString);
                    setTranslateLoading(false);
                } else {
                    setIsLimitReached(true);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
            //eslint-disable-next-line
        },
        [user, hasActiveSubscription, isError, limitWord]
    );

    const seekToSubtitle = useCallback(
        (direction: boolean): void => {
            if (videoRef.current) {
                let currentIndex = subtitles.findIndex(
                    (sub) => currentTime >= sub.startSeconds && currentTime <= sub.endSeconds
                );
                let newIndex = direction ? currentIndex + 1 : currentIndex - 1;

                if (currentIndex <= 0) {
                    currentIndex = subtitles.findIndex((sub) => sub.startSeconds > currentTime);
                    newIndex = direction ? currentIndex + 1 : currentIndex - 1;
                }

                if (newIndex >= 0 && newIndex < subtitles.length) {
                    const newTime = direction
                        ? subtitles[newIndex].startSeconds
                        : subtitles[newIndex].endSeconds;
                    setCurrentTime(newTime);
                    videoRef.current.currentTime = newTime;
                }
            }
        },
        [currentTime, subtitles]
    );

    const handleSelectSymbol = useCallback(
        async (char: any) => {
            if (!user && limitedWords >= LIMITED_WORDS_COUNT) {
                handleGuestLimit();
                return;
            }
            setClickedSymbol(char);
            setTranslatedRu(null);
            setTranslatedEn(null);
            setPinyin(null);
            await translate(char.char);
        },
        [handleGuestLimit, limitedWords, translate, user]
    );

    const handleSymbolOnClick = () => {
        if (isPlaying) togglePlay();
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            rangeRef.current?.style.setProperty(
                '--background-size',
                `${((currentTime - 0) / (videoRef.current.duration - 0)) * 100}%`
            );
        }
    }, [currentTime]);

    useEffect(() => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            const currentSub = subtitlesZh.find(
                (sub) => currentTime >= sub.startSeconds && currentTime <= sub.endSeconds
            );
            const currentSecondSub = subtitles.find(
                (sub) => currentTime >= sub.startSeconds && currentTime <= sub.endSeconds
            );

            if (currentSub) {
                setCurrentSubtitle(currentSub.text);
                currentSecondSub && setSecondSubtitle(currentSecondSub?.text);
            } else {
                setCurrentSubtitle('');
                setSecondSubtitle('');
            }
        }
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            setUserAgentIos(true);
        }
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            setUserAgentPhone(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLanguage]);

    return (
        <div
            className={
                fullScreen
                    ? userAgentIos
                        ? styles.playerIosFullscreen
                        : styles.playerFullscreen
                    : userAgentIos
                        ? styles.playerIos
                        : styles.player
            }
            ref={playerRef}
        >
            <video
                className={styles.video}
                ref={videoRef}
                playsInline={true}
                autoPlay={true}
                onError={() => {
                    videoRef.current?.load();
                }}
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadStart={() => setIsVideoLoading(true)}
                onLoadedData={() => setIsVideoLoading(false)}
                onWaiting={() => setIsVideoLoading(true)}
                onPlaying={() => setIsVideoLoading(false)}
            >
                <source src={videoUrl} />
            </video>
            {isVideoLoading && (
                <div className={styles.loaderOverlay}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                        zIndex={99}
                    />
                </div>
            )}
            <div className={styles.subtitles_wrapper}>
                <Box
                    userSelect={'none'}
                    onClick={() => !isVideoLoading && seekToSubtitle(false)}
                    padding={1}
                    zIndex={30}
                    cursor={'pointer'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    _hover={{
                        backgroundColor: '#4b4b4b',
                        transition: 'background-color 0.3s ease-in-out',
                    }}
                >
                    <Icon boxSize={8} color={'white'} as={AiOutlineArrowLeft} />
                </Box>
                <div className={styles.subtitles}>
                    {currentSubtitle && userAgentPhone
                        ? currentLanguage === Languages.zh
                            ? subtitleSecondChars?.map((char, index) => (
                                <div key={index} onClick={handleSymbolOnClick}>
                                    <PopupCard
                                        hasActiveSubscription={hasActiveSubscription}
                                        isTranslateLoading={isTranslateLoading}
                                        char={char}
                                        index={index}
                                        handleSelectSymbol={handleSelectSymbol}
                                        clickedSymbol={clickedSymbol}
                                        setClickedSymbol={setClickedSymbol}
                                        isLimitReached={isLimitReached}
                                        pinyin={pinyin}
                                        translatedRu={translatedRu}
                                        translatedEn={translatedEn}
                                        handleClose={handleClose}
                                    />
                                </div>
                            ))
                            : subtitleSecondChars?.map((char, index) => (
                                <span key={index} className={styles.clickableSymbol} onClick={handleSymbolOnClick}>
                                    {char}
                                </span>
                            ))
                        : subtitleChars?.map((char, index) => (
                            <div key={index} onClick={handleSymbolOnClick}>
                                <PopupCard
                                    hasActiveSubscription={hasActiveSubscription}
                                    isTranslateLoading={isTranslateLoading}
                                    char={char}
                                    index={index}
                                    handleSelectSymbol={handleSelectSymbol}
                                    clickedSymbol={clickedSymbol}
                                    setClickedSymbol={setClickedSymbol}
                                    isLimitReached={isLimitReached}
                                    pinyin={pinyin}
                                    translatedRu={translatedRu}
                                    translatedEn={translatedEn}
                                    handleClose={handleClose}
                                />
                            </div>
                        ))}
                </div>
                <Box
                    userSelect={'none'}
                    onClick={() => !isVideoLoading && seekToSubtitle(true)}
                    padding={1}
                    zIndex={30}
                    cursor={'pointer'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    _hover={{
                        backgroundColor: '#4b4b4b',
                        transition: 'background-color 0.3s ease-in-out',
                    }}
                >
                    <Icon boxSize={8} color={'white'} as={AiOutlineArrowRight} />
                </Box>
            </div>
            {!userAgentPhone && currentLanguage !== 'zh' && (
                <div className={styles.second_subtitles}>
                    {secondSubtitle &&
                        subtitleSecondChars?.map((char, index) => (
                            <span key={index} className={styles.clickableSymbol} onClick={handleSymbolOnClick}>
                                {char}
                            </span>
                        ))}
                </div>
            )}
            <ControlsPanel
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                currentTime={currentTime}
                userAgentPhone={userAgentPhone}
                userAgentIos={userAgentIos}
                currentLanguage={currentLanguage}
                fullScreen={fullScreen}
                videoRef={videoRef}
                playerRef={playerRef}
                setCurrentLanguage={setCurrentLanguage}
                setFullScreen={setFullScreen}
                setCurrentTime={setCurrentTime}
                setIsVideoLoading={setIsVideoLoading}
            />
            <LimitModal onClose={onClose} isOpen={isOpen} />
            <LimitGuestModal isOpen={isGuestOpen} />
        </div>
    );
};

export default PlayerComponent;
