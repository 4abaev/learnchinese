import { IWord } from '@/api/dictionary';

type DictionaryState = {
    words: IWord[]
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
};
