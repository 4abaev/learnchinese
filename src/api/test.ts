import { AxiosInstance } from 'axios';
import { HttpClient } from '@/api/axios';


export interface ITest {
    id: string;
    words: IWord[];
}
export interface  IWord {
    id?: number;
    wordOnChinese: string;
    wordOnRu: string;
    wordOnEn: string;
    pinyin: string;
}

export class TestApi {
    private static instance: TestApi | null = null;
    private httpInstance: AxiosInstance;
    private constructor() {
        this.httpInstance = HttpClient.getAuthorizedInstance();
    }

    public static getInstance(): TestApi {
        if (this.instance) return this.instance;
        this.instance = new TestApi();
        return this.instance;
    }

    async getTest(): Promise<ITest> {
        return (await this.httpInstance.post('/dictionary/getTest')).data;
    }
    async endTest(): Promise<ITest> {
        return (await this.httpInstance.patch('/dictionary/endTest')).data;
    }
}
