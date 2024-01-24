import { IUser } from '@/interfaces';

export type SubscriptionState = {
    subscriptions: IUser['subscriptions'];
    error: string | undefined;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
};
