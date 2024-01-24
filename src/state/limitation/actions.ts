import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { HttpClient } from '@/api/axios';
import { ServerError } from '@/interfaces';

const authorizedInstance = HttpClient.getAuthorizedInstance();

export interface ILimit {
    translateLimit?: number;
    error: boolean;
    message: string;
}

export const limitWord = createAsyncThunk<any, void, { rejectValue: string }>(
    'limit/word',
    async function(data, thunkAPI) {
        try {
            const res: ILimit = (await authorizedInstance.post('limitation/wordIncrement', data))
                .data;
            if (res.error) {
                return thunkAPI.rejectWithValue(res.message);
            }
            return thunkAPI.fulfillWithValue({ translateLimit: res.translateLimit });
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const limitWatch = createAsyncThunk<any, void, { rejectValue: string }>(
    'limit/watch',
    async function(data, thunkAPI) {
        try {
            const res: ILimit = (await authorizedInstance.post('limitation/watchIncrement', data))
                .data;
            if (res.error) {
                return thunkAPI.rejectWithValue(res.message);
            }
            return thunkAPI.fulfillWithValue({ translateLimit: res.translateLimit });
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const limitDictionary = createAsyncThunk<any, void, { rejectValue: string }>(
    'limit/dictionary',
    async function(data, thunkAPI) {
        try {
            const res: ILimit = (await authorizedInstance.post('limitation/addToDictionary', data))
                .data;
            if (res.error) {
                return thunkAPI.rejectWithValue(res.message);
            }
            return thunkAPI.fulfillWithValue({ translateLimit: res.translateLimit });
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    },
);
