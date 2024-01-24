import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { setCookie } from 'nookies';
import { IUser, ServerError } from '@/interfaces';
import { HttpClient } from '@/api/axios';

const baseInstanse = HttpClient.getBaseInstance();
const authorizedInstance = HttpClient.getAuthorizedInstance();

export const login = createAsyncThunk<
    { user: IUser; jwt: string },
    UserAPI.SigninForm,
    { rejectValue: string }
>('auth/login', async function (data, thunkAPI) {
    try {
        const { user, jwt } = (await baseInstanse.post('auth/local', data)).data;

        setCookie(null, 'jwt', jwt, {
            path: '/',
            maxAge: 24 * 60 * 60,
        });

        HttpClient.updateAuthorizedInstance(jwt);
        HttpClient.updateAuthorizedPrerenderInstance(jwt);
        return thunkAPI.fulfillWithValue({ user, jwt });
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
    }
});

export const register = createAsyncThunk<
    { user: IUser },
    UserAPI.SignupForm,
    { rejectValue: string }
>('auth/register', async function (data, thunkAPI) {
    try {
        const { user } = (await baseInstanse.post('auth/local/register', data)).data;

        return thunkAPI.fulfillWithValue(user);
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
    }
});

export const forgotPassword = createAsyncThunk<
    void,
    UserAPI.forgotPasswordForm,
    { rejectValue: string }
>('auth/forgotPassword', async function (data, thunkAPI) {
    try {
        const res = (await baseInstanse.post('auth/forgot-password', data)).data;
        return thunkAPI.fulfillWithValue(res);
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
    }
});

export const resetPassword = createAsyncThunk<
    void,
    UserAPI.resetPasswordForm,
    { rejectValue: string }
>('auth/resetPassword', async function (data, thunkAPI) {
    try {
        const res = (await baseInstanse.post('auth/reset-password', data)).data;
        return thunkAPI.fulfillWithValue(res);
    } catch (err) {
        const { error } = (err as AxiosError).response?.data as ServerError;
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
    }
});

export const getMe = createAsyncThunk<IUser, void, { rejectValue: string }>(
    'auth/getMe',
    async function (_, thunkAPI) {
        try {
            const user = (await authorizedInstance.get('users/me?populate=*')).data;
            return thunkAPI.fulfillWithValue(user);
        } catch (err) {
            const { error } = (err as AxiosError).response?.data as ServerError;
            const { message } = error;
            return thunkAPI.rejectWithValue(message);
        }
    }
);
