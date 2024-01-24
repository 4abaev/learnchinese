import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react'; // Импортируйте необходимые компоненты из вашей библиотеки стилей
import {
    AiFillPlayCircle,
    AiFillPauseCircle,
    AiOutlineFullscreen,
    AiOutlineFullscreenExit,
} from 'react-icons/ai';
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs';
import { MdSubtitles } from 'react-icons/md';
import { PiCaretDoubleRightThin, PiCaretDoubleLeftThin } from 'react-icons/pi';
import { useEventListener, useOnClickOutside, useSessionStorage } from 'usehooks-ts';
import styles from './player.module.css';
import { Languages } from '@/components/media/player/playerComponent';
import { formatTime } from '@/utils/timeFormatter';

export enum Speeds {
    low = 0.8,
    normal = 1,
    high = 1.2,
}

const ControlsPanel = ({
    isPlaying,
    togglePlay,
    currentTime,
    userAgentPhone,
    userAgentIos,
    currentLanguage,
    fullScreen,
    videoRef,
    playerRef,
    setCurrentLanguage,
    setFullScreen,
    setCurrentTime,
    setIsVideoLoading,
}: any) => {
    const [subControlsOpen, setSubControlsOpen] = useState<boolean>(false);
    const [speedControlsOpen, setSpeedControlsOpen] = useState<boolean>(false);
    const [volumeOpen, setVolumeOpen] = useState<boolean>(false);
    const [currentSpeed, setCurrentSpeed] = useSessionStorage<Speeds>('currSpeed', Speeds.normal);
    const [volume, setVolume] = useSessionStorage('currVolume', 1);
    const subsRef = useRef(null);
    const speedsRef = useRef(null);
    const volumeRef = useRef(null);
    const rangeRef = useRef(null);
    useOnClickOutside(subsRef, () => setSubControlsOpen(false));
    useOnClickOutside(speedsRef, () => setSpeedControlsOpen(false));
    useOnClickOutside(volumeRef, () => setVolumeOpen(false));
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.playbackRate = currentSpeed;
        }
    }, [currentSpeed, videoRef, volume]);

    const seek = useCallback(
        (direction: boolean): void => {
            if (videoRef.current) {
                if (direction) {
                    setCurrentTime(currentTime + 10);
                    videoRef.current.currentTime = currentTime + 10;
                } else {
                    if (videoRef.current.currentTime !== 0) {
                        setCurrentTime(currentTime - 10);
                        videoRef.current.currentTime = currentTime - 10;
                    }
                }
            }
        },// eslint-disable-next-line react-hooks/exhaustive-deps
        [currentTime],
    );

    const volumeChange = useCallback(
        (direction: boolean) => {
            if (videoRef.current) {
                if (direction && volume < 0.9) {
                    setVolume(volume + 0.1);
                    videoRef.current.volume = volume + 0.1;
                } else if (!direction && volume > 0.1) {
                    setVolume(volume - 0.1);
                    videoRef.current.volume = volume - 0.1;
                } else if (!direction && volume !== 0) {
                    setVolume(0);
                    videoRef.current.volume = 0;
                } else if (direction && volume !== 1) {
                    setVolume(1);
                    videoRef.current.volume = 1;
                }
            } // в идеале тоже привести к нормальному виду
        },
        [volume, setVolume],
    );

    const handleToggleFullscreen = useCallback(() => {
        setFullScreen(!fullScreen);
        if (!document.fullscreenElement && !userAgentIos) {
            playerRef.current?.requestFullscreen();
        } else if (!userAgentIos) {
            document.exitFullscreen();
        }

        if (!fullScreen && userAgentIos) {
            document.body.style.backgroundColor = 'black';
        } else {
            document.body.style.backgroundColor = 'white'; // Надо вынести в redux на уровень layout (сейчас это bad-solution)
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullScreen, userAgentIos]);

    const keyHandler = useCallback(
        (e: KeyboardEvent) => {
            e.code === 'Space' && togglePlay();
            e.code === 'ArrowRight' && seek(true);
            e.code === 'ArrowLeft' && seek(false);
            e.code === 'ArrowUp' && volumeChange(true);
            e.code === 'ArrowDown' && volumeChange(false);
            e.code === 'Escape' && fullScreen && handleToggleFullscreen();
            e.code === 'KeyF' && handleToggleFullscreen();
        },
        [togglePlay, seek, volumeChange, fullScreen, handleToggleFullscreen],
    );
    useEventListener('keydown', keyHandler);
    const handleChangeLang = useCallback(
        (lang: string) => {
            lang === Languages.en && setCurrentLanguage(Languages.en);
            lang === Languages.ru && setCurrentLanguage(Languages.ru);
            lang === Languages.zh && setCurrentLanguage(Languages.zh);
            setSubControlsOpen(false);
        },
        [setCurrentLanguage],
    );




    const setPlaybackSpeed = useCallback(
        (speed: Speeds) => {
            if (videoRef.current) {
                videoRef.current.playbackRate = speed;
            }
            setCurrentSpeed(speed);
            setSpeedControlsOpen(false);
        },
        [setCurrentSpeed, videoRef],
    );

    return (
        <div className={styles.controlsPanel}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} pr={2}>
                <Flex color={'white'} alignItems={'center'} gap={5}>
                    <Flex alignItems={'center'}>
                        <button tabIndex={-1} onClick={togglePlay} className={styles.toggleButton}>
                            <Icon
                                color={'white'}
                                boxSize={[8, 10]}
                                as={isPlaying ? AiFillPauseCircle : AiFillPlayCircle}
                            />
                        </button>
                        {formatTime(currentTime)} /{' '}
                        {formatTime(videoRef.current?.duration || 0)}                    </Flex>
                    {!userAgentPhone && (
                        <Flex alignItems={'center'} gap={2}>
                            <Icon
                                cursor={'pointer'}
                                boxSize={[4, 6]}
                                color={'white'}
                                as={PiCaretDoubleLeftThin}
                                onClick={() => seek(false)}
                            />
                            <Icon
                                cursor={'pointer'}
                                boxSize={[4, 6]}
                                color={'white'}
                                as={PiCaretDoubleRightThin}
                                onClick={() => seek(true)}
                            />
                        </Flex>
                    )}
                </Flex>
                <Flex gap={5} justifyContent={'flex-end'} alignItems={'center'}>
                    <Flex ref={subsRef} position={'relative'} alignItems={'center'}>
                        <Icon
                            color={'white'}
                            boxSize={[4, 6]}
                            as={MdSubtitles}
                            onClick={() => setSubControlsOpen(!subControlsOpen)}
                            cursor={'pointer'}
                        />
                        {subControlsOpen && (
                            <div className={styles.subControls}>
                                <button
                                    className={
                                        currentLanguage === Languages.en
                                            ? styles.currentSubsStyle
                                            : styles.subsStyle
                                    }
                                    onClick={() => handleChangeLang(Languages.en)}
                                >
                                    {Languages.en}
                                </button>
                                <button
                                    className={
                                        currentLanguage === Languages.ru
                                            ? styles.currentSubsStyle
                                            : styles.subsStyle
                                    }
                                    onClick={() => handleChangeLang(Languages.ru)}
                                >
                                    {Languages.ru}
                                </button>
                                <button
                                    className={
                                        currentLanguage === Languages.zh
                                            ? styles.currentSubsStyle
                                            : styles.subsStyle
                                    }
                                    onClick={() => handleChangeLang(Languages.zh)}
                                >
                                    {Languages.zh}
                                </button>
                            </div>
                        )}
                    </Flex>
                    <Flex ref={speedsRef} position={'relative'} alignItems={'center'}>
                        <Box
                            textAlign={'center'}
                            width={'35px'}
                            cursor={'pointer'}
                            color={'white'}
                            onClick={() => setSpeedControlsOpen(!speedControlsOpen)}
                        >
                            {currentSpeed}x
                        </Box>
                        {speedControlsOpen && (
                            <div className={styles.speedControls}>
                                <button
                                    className={
                                        currentSpeed === Speeds.low
                                            ? styles.currentSpeedStyle
                                            : styles.speedStyle
                                    }
                                    onClick={() => setPlaybackSpeed(Speeds.low)}
                                >
                                    {Speeds.low}x
                                </button>
                                <button
                                    className={
                                        currentSpeed === Speeds.normal
                                            ? styles.currentSpeedStyle
                                            : styles.speedStyle
                                    }
                                    onClick={() => setPlaybackSpeed(Speeds.normal)}
                                >
                                    {Speeds.normal}x
                                </button>
                                <button
                                    className={
                                        currentSpeed === Speeds.high
                                            ? styles.currentSpeedStyle
                                            : styles.speedStyle
                                    }
                                    onClick={() => setPlaybackSpeed(Speeds.high)}
                                >
                                    {Speeds.high}x
                                </button>
                            </div>
                        )}
                    </Flex>
                    {!userAgentIos && (
                        <Flex alignItems={'center'} position={'relative'} ref={volumeRef}>
                            <Icon
                                color={'white'}
                                boxSize={[5, 7]}
                                cursor={'pointer'}
                                as={volume !== 0 ? BsFillVolumeUpFill : BsFillVolumeMuteFill}
                                onClick={() => setVolumeOpen(!volumeOpen)}
                            />
                            {volumeOpen && (
                                <input
                                    type='range'
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={volume}
                                    onChange={(e) => {
                                        const newVolume = Number(e.target.value);
                                        e.target.style.setProperty(
                                            '--background-size',
                                            `${((newVolume - 0) / 1) * 100}%`,
                                        );
                                        setVolume(newVolume);
                                        if (videoRef.current) {
                                            videoRef.current.volume = newVolume;
                                        }
                                    }}
                                    className={styles.volumeSlider}
                                />
                            )}
                        </Flex>
                    )}
                    <Box display={'flex'} alignItems={'flex-end'}>
                        <Icon
                            cursor={'pointer'}
                            boxSize={[4, 8]}
                            color={'white'}
                            onClick={handleToggleFullscreen}
                            as={fullScreen ? AiOutlineFullscreenExit : AiOutlineFullscreen}
                        />
                    </Box>
                </Flex>
            </Box>
            <input
                type='range'
                ref={rangeRef}
                min={0}
                max={videoRef.current?.duration || 0}
                value={currentTime}
                onChange={(e) => {
                    setCurrentTime(Number(e.target.value));
                    setIsVideoLoading(true);
                    if (videoRef.current) {
                        videoRef.current.currentTime = Number(e.target.value);
                    }                }}
                className={styles.progressSlider}
            />
        </div>
    );
};

export default ControlsPanel;