import { AxiosInstance } from 'axios';
import { HttpClient } from './axios';
import { ITariff } from './tariff';
import { IUser } from '@/interfaces';

export interface ISubscriptions {
    id: string;
    isActive: boolean;
    startDay: string;
    dueToDay: string;
    createdAt: string;
}

export class SubscriptionApi {
    private static instance: SubscriptionApi | null = null;
    private httpInstance: AxiosInstance;
    private constructor() {
        this.httpInstance = HttpClient.getAuthorizedInstance();
    }

    public static getInstance(): SubscriptionApi {
        if (this.instance) return this.instance;
        this.instance = new SubscriptionApi();
        return this.instance;
    }
    async getUserSubscriptions(): Promise<IUser> {
        return (await this.httpInstance.get('/users/me?populate=*')).data;
    }
    async createSubscriptions(id: ITariff['id']): Promise<ISubscriptions> {
        return (await this.httpInstance.post('/subscription/create', { tariff_id: id })).data;
    }
}
