import { createSlice } from '@reduxjs/toolkit';
import { destroyCookie } from 'nookies';
import * as authActions from './actions';
const initialState: AuthState = {
    user: null,
    error: '',
    isSuccess: false,
    isError: false,
    isLoading: false,
    isAuth: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearstate(state) {
            state.user = null;
            state.error = '';
            state.isAuth = false;
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            destroyCookie(null, 'jwt', { path: '/', maxAge: -1 });
            return state;
        },
        clearSucces(state) {
            state.isSuccess = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authActions.register.pending, (state: AuthState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(authActions.register.fulfilled, (state: AuthState, action) => {
                state.user = action.payload.user;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(authActions.register.rejected, (state: AuthState, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(authActions.login.pending, (state: AuthState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(authActions.login.fulfilled, (state: AuthState, action) => {
                state.user = action.payload.user;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(authActions.login.rejected, (state: AuthState, action) => {
                state.user = null;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(authActions.forgotPassword.pending, (state: AuthState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(authActions.forgotPassword.fulfilled, (state: AuthState) => {
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(authActions.forgotPassword.rejected, (state: AuthState, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(authActions.resetPassword.pending, (state: AuthState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(authActions.resetPassword.fulfilled, (state: AuthState) => {
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(authActions.resetPassword.rejected, (state: AuthState, action) => {
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(authActions.getMe.fulfilled, (state: AuthState, action) => {
                state.user = action.payload;
            });
    },
});

export const { clearstate, clearSucces } = authSlice.actions;

export const authSelector = (state: { user: AuthState }) => state.user;
