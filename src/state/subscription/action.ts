import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { SubscriptionApi } from '@/api/subscription';
import { ITariff } from '@/api/tariff';
import { ISubscriptions, IUser, ServerError } from '@/interfaces';

const subscriptionApi = SubscriptionApi.getInstance();

export const loadingUserSubscriptions = createAsyncThunk<
    IUser['subscriptions'],
    void,
    { rejectValue: string }
>('subscription/loads', async function (_, thunkAPI) {
    try {
        const { subscriptions } = await subscriptionApi.getUserSubscriptions();
        return thunkAPI.fulfillWithValue(subscriptions);
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
    }
});

export const designSubscribe = createAsyncThunk<
    ISubscriptions,
    ITariff['id'],
    { rejectValue: string }
>('subscription-create', async function (id, thunkAPI) {
    try {
        const res = await subscriptionApi.createSubscriptions(id);
        return thunkAPI.fulfillWithValue(res);
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
    }
});
