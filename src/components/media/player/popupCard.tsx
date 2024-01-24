'use client';
import { Box, Button, Icon, Spinner } from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import localFont from 'next/font/local';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'use-intl';
import { useOnClickOutside } from 'usehooks-ts';
import styles from './player.module.css';
import { useActions, useAppSelector } from '@/state/store';

const helvetica = localFont({
    src: '../../../fonts/helvetica_regular.otf',
    display: 'swap',
});

const helveticaNeu = localFont({
    src: '../../../fonts/HelveticaNeueCyr-Light.woff2',
    display: 'swap',
});

const PopupCard = ({
    char,
    index,
    handleSelectSymbol,
    clickedSymbol,
    setClickedSymbol,
    isLimitReached,
    pinyin,
    translatedRu,
    translatedEn,
    handleClose,
    isTranslateLoading,
    hasActiveSubscription,
}: any) => {
    const [addLoading, setAddLoading] = useState(false);
    const { addWord, getDictionary, limitDictionary } = useActions();
    const { isAddError } = useAppSelector((state) => state.limit);
    const { user } = useAppSelector((state) => state.auth);
    const handleAddWord = useCallback(
        async (ch: string, ru: string, en: string, pinyin: string) => {
            setAddLoading(true);
            const word = {
                wordOnChinese: ch,
                wordOnRu: ru,
                wordOnEn: en,
                pinyin: pinyin,
            };
            !hasActiveSubscription && (await limitDictionary());
            !isAddError && (await addWord(word));
            !isAddError && (await getDictionary());
            setAddLoading(false);
        },
        [hasActiveSubscription, limitDictionary, isAddError, addWord, getDictionary]
    );
    const t = useTranslations('Player');

    const { words } = useAppSelector((state) => state.dictionary);
    const isExist = useMemo(
        () => words.some((word) => word.wordOnChinese === char.props.children),
        [char.props.children, words]
    );

    const popupRef = useRef<HTMLInputElement | null>(null);
    useOnClickOutside(popupRef, () => setClickedSymbol(null));
    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                handleSelectSymbol({
                    char: char.props.children,
                    index: index,
                });
            }}
            className={styles.clickableSymbol}
        >
            <div className={styles.scalableText}>{char}</div>
            {clickedSymbol?.char === char.props.children && clickedSymbol.index === index && (
                <div className={styles.popup} ref={popupRef} onClick={(e) => e.stopPropagation()}>
                    {isTranslateLoading ? (
                        <Box>
                            {' '}
                            <Spinner size={'lg'} />{' '}
                        </Box>
                    ) : (
                        <>
                            <div
                                className={
                                    isLimitReached ? styles.limitReached : styles.displayNone
                                }
                            >
                                {t('limit-reached')}
                            </div>
                            <Icon
                                position={'absolute'}
                                right={'2'}
                                top={'2'}
                                cursor={'pointer'}
                                boxSize={'7'}
                                as={AiOutlineClose}
                                onClick={(e) => handleClose(e)}
                            />
                            <div>
                                <p
                                    className={helvetica.className}
                                    style={{
                                        fontSize: '20pt',
                                        cursor: 'default',
                                        textDecoration: 'none',
                                    }}
                                >
                                    {clickedSymbol.char}
                                </p>
                                <p className={helvetica.className} style={{ fontSize: '16pt' }}>
                                    {t('pinyin')}:{' '}
                                    {pinyin !== null && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: pinyin,
                                            }}
                                        />
                                    )}
                                </p>
                                <p className={helveticaNeu.className} style={{ fontSize: '14pt' }}>
                                    Русский: {translatedRu}
                                </p>
                                <p className={helveticaNeu.className} style={{ fontSize: '14pt' }}>
                                    English:{' '}
                                    {translatedEn !== null && (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: translatedEn,
                                            }}
                                        />
                                    )}
                                </p>
                            </div>
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Button
                                    minWidth={'50%'}
                                    colorScheme='green'
                                    isDisabled={isExist || isAddError || !user}
                                    isLoading={addLoading}
                                    onClick={() => {
                                        if (
                                            translatedEn !== null &&
                                            translatedRu !== null &&
                                            pinyin !== null
                                        ) {
                                            handleAddWord(
                                                clickedSymbol.char,
                                                translatedRu,
                                                translatedEn,
                                                pinyin
                                            );
                                        }
                                    }}
                                >
                                    {isAddError ? t('limit') : isExist ? t('exist') : t('add')}
                                </Button>
                                <Button colorScheme='gray' onClick={(e) => handleClose(e)}>
                                    {t('close')}
                                </Button>
                            </Box>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PopupCard;