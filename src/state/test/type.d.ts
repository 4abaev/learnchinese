import { IWord } from '@/api/dictionary';

type TestState = {
    words: IWord[]
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
};
