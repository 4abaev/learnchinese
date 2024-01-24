'use client';
import {
    Box,
    Button,
    Flex,
    Heading,
    InputGroup,
    InputLeftAddon,
    Select,
    Text,
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'use-intl';
import { parseCookies, setCookie } from 'nookies';
import { convertToMoscowTime } from '@/utils/timeFormatter';
import { useAppSelector } from '@/state/store';
import { clearstate } from '@/state/auth/slice';
import { geneareWordFromDayNumber } from '@/utils/dayFormatter';

const ProfileComponent = () => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();
    const path = usePathname();
    const t = useTranslations('Profile');
    const { NEXT_LOCALE } = parseCookies();
    const locale = NEXT_LOCALE || 'ru';

    const handleClick = useCallback(() => {
        dispatch(clearstate());
        window.location.href = '/auth/login';
    }, [dispatch]);

    const switchLocale = useCallback(
        (locale: string) => {
            const pathName = path.includes('en') ? '/' + path.split('/').at(-1) : path;
            setCookie(null, 'NEXT_LOCALE', locale, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 365,
            });
            return (window.location.href = `/${locale}${pathName}`);
        },
        [path]
    );
    const dueToDay = user?.subscriptions.at(-1)?.dueToDay;
    const date1 = new Date();
    const date2 = new Date(dueToDay!);
    const hasActiveSubscription = useMemo(() => {
        return user?.subscriptions.some((subscription) => subscription.isActive);
    }, [user?.subscriptions]);
    const diff = date2.getTime() - date1.getTime();

    const milliseconds = diff;
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    return (
        <Flex flexDir={'column'} m={10} p={4} border={'3px solid #72b172'} borderRadius={4}>
            <Heading textAlign={'center'} m={4}>
                {t('pa')}
            </Heading>
            <Text>
                {t('login')}: {user?.username}
            </Text>
            <Text>
                {t('email')}: {user?.email}
            </Text>
            <Text>
                {t('status')}: {hasActiveSubscription ? t('active') : t('notActive')}
            </Text>
            {hasActiveSubscription && (
                <Box>
                    <Text>
                        {t('due')}: {user?.subscriptions.at(-1)?.dueToDay}
                    </Text>
                    <Text>
                        {t('qd')}
                        {':'}
                        {locale === 'ru'
                            ? geneareWordFromDayNumber(Math.ceil(days))
                            : Math.ceil(days)}
                    </Text>
                </Box>
            )}

            <Text>
                {t('rd')}: {convertToMoscowTime(user?.createdAt)}
            </Text>
            <InputGroup my={2}>
                <InputLeftAddon>{t('locale')}: </InputLeftAddon>
                <Select
                    borderRadius={0}
                    placeholder={locale == 'ru' ? t('ru') : t('en')}
                    onChange={(e) => switchLocale(e.target.value)}
                >
                    {locale !== 'en' && <option value='en'>{t('en')}</option>}
                    {locale !== 'ru' && <option value='ru'>{t('ru')}</option>}
                </Select>
            </InputGroup>
            <Flex>
                <Button mt={16} mx={'auto'} colorScheme={'red'} onClick={handleClick}>
                    {t('exit')}
                </Button>
                <Button
                    mt={16}
                    mx={'auto'}
                    colorScheme={'blue'}
                    onClick={() => (window.location.href = '/profile/subscription')}
                >
                    {t('subscriptions')}
                </Button>
            </Flex>
        </Flex>
    );
};
export default ProfileComponent;
