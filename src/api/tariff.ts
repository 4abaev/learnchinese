import { AxiosInstance } from 'axios';
import { HttpClient } from './axios';

export interface ITariff {
    id: string;
    attributes: {
        month: number;
        price: number;
    };
}

export class TariffApi {
    private static instance: TariffApi | null = null;
    private httpInstance: AxiosInstance;

    private constructor() {
        this.httpInstance = HttpClient.getBaseInstance();
    }

    public static getInstance(): TariffApi {
        if (this.instance) return this.instance;
        this.instance = new TariffApi();
        return this.instance;
    }

    async getTariffs(locale: string): Promise<ITariff[]> {
        return (await this.httpInstance.get(`/tariffs?locale=${locale}`)).data.data;
    }
}
