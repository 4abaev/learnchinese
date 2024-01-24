import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ServerError } from '@/interfaces';
import { TestApi } from '@/api/test';

const testApi = TestApi.getInstance();

export const getTest = createAsyncThunk(
    'get/test',
    async function (_, thunkAPI) {
        try {
            const res = await testApi.getTest();
            return thunkAPI.fulfillWithValue(res.words);
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const endTest = createAsyncThunk(
    'patch/test',
    async function (_, thunkAPI) {
        try {
            const res = await testApi.endTest();
            return thunkAPI.fulfillWithValue(res.words);
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);