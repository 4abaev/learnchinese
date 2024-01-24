import { AxiosInstance } from 'axios';
import { HttpClient } from '@/api/axios';

export interface IDictionary {
    id: string;
    word: IWord[];
}

export interface  IWord {
    id?: number;
    wordOnChinese: string;
    wordOnRu: string;
    wordOnEn: string;
    pinyin: string;
}

export class DictionaryApi {
    private static instance: DictionaryApi | null = null;
    private httpInstance: AxiosInstance;
    private constructor() {
        this.httpInstance = HttpClient.getAuthorizedInstance();
    }

    public static getInstance(): DictionaryApi {
        if (this.instance) return this.instance;
        this.instance = new DictionaryApi();
        return this.instance;
    }
    async getDictionary(): Promise<IDictionary> {
        return (await this.httpInstance.get('/dictionary/getDictionary?populate=word')).data;
    }
    async addWord(wordObject: IWord): Promise<IDictionary> {
        return (await this.httpInstance.post('/dictionary/addWord', wordObject)).data;
    }
    async deleteWord(wordId: number): Promise<IDictionary> {
        return (await this.httpInstance.delete(`/dictionary/deleteWord/${wordId}`)).data;
    }
}
