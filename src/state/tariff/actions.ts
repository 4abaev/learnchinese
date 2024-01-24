import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ITariff, TariffApi } from '@/api/tariff';
import { ServerError } from '@/interfaces';

const tariffApi = TariffApi.getInstance();
export const getAllTariff = createAsyncThunk<ITariff[], string, { rejectValue: string }>(
    'tariff/loads',
    async function (locale, thunkAPI) {
        try {
            const res = await tariffApi.getTariffs(locale);
            return thunkAPI.fulfillWithValue(res);
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
