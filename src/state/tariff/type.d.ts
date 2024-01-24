import { ITariff } from '@/interfaces';

export type TariffState = {
    list: ITariff[];
    error: string | undefined;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
};
