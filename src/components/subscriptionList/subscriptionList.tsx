'use client';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SubscriptionTable from '../subscriptionTable/subscriptionTable';
import TariffItem from '../tariffItem/tariffItem';
import { loadingUserSubscriptions } from '@/state/subscription/action';
import { ITariff } from '@/api/tariff';
import { getAllTariff } from '@/state/tariff/actions';
import { useAppDispatch, useAppSelector } from '@/state/store';
import TariffInfoTable from '@/components/tariffInfoTable/tariffInfoTable';

const SubscriptionList = ({onOpenRegisterModal}: {onOpenRegisterModal?:()=>void}) => {
    const dispatch = useAppDispatch();
    const { list } = useAppSelector((state) => state.tariffs);
    const { user } = useAppSelector((state) => state.auth);
    const t = useTranslations('Subscription');
    const { NEXT_LOCALE } = parseCookies();
    const router = useRouter();
    const handleSubscribe = (tariff: ITariff) => {
        if(user){
            createPayment(tariff);
            return;
        }
        if (onOpenRegisterModal && typeof onOpenRegisterModal === 'function') {
            onOpenRegisterModal();
            return;
        }
        router.push('/auth/register');
    };

    const createPayment = async (tariff: ITariff) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_YOUCASSA_URL}/api/payment`, {
            email: user?.email,
            ...tariff,
        });
        const confirm = response.data.confirmation;
        router.push(confirm.confirmation_url);
    };

    useEffect(() => {
        if (NEXT_LOCALE) {
            dispatch(getAllTariff(NEXT_LOCALE));
        }
        dispatch(loadingUserSubscriptions());
    }, [dispatch]);
    return (
        <Flex flexDir={'column'}>
            {/* <Text textAlign={'center'} fontSize={'4xl'} mt={4}>
                {t('sm')}
            </Text> */}
            
            <Flex flexWrap={'wrap'} gap={4} justifyContent={'space-around'} mt={10}>
                {list.map((tariff) => (
                    <TariffItem
                        handleSubscribe={() => handleSubscribe(tariff)}
                        key={tariff.id}
                        {...tariff}
                    />
                ))}
            </Flex>
            <TariffInfoTable />
            <SubscriptionTable />
        </Flex>
    );
};
export default SubscriptionList;
