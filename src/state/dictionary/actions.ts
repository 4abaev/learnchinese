import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ServerError } from '@/interfaces';
import { DictionaryApi, IDictionary, IWord } from '@/api/dictionary';

const dictionaryApi = DictionaryApi.getInstance();
export const getDictionary = createAsyncThunk(
    'get/dictionary',
    async function (_, thunkAPI) {
        try {
            const res: IDictionary = (await dictionaryApi.getDictionary());
            return thunkAPI.fulfillWithValue(res.word);
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const addWord = createAsyncThunk(
    'post/word',
    async function (data: IWord, thunkAPI) {
        try {
            const res = await dictionaryApi.addWord(data);
            return thunkAPI.fulfillWithValue(res.word);
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const deleteWord = createAsyncThunk(
    'delete/word',
    async function (data: number, thunkAPI) {
        try {
            const res = await dictionaryApi.deleteWord(data);
            return thunkAPI.fulfillWithValue(res.word);
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
