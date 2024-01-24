import { createSlice } from '@reduxjs/toolkit';
import * as limitActions from './actions';

const initialState: LimitState = {
    translateLimit: null,
    watchLimit: null,
    addToDictionaryLimit: null,
    error: '',
    isSuccess: false,
    isError: false,
    isAddError: false,
    isLoading: false,
    isAuth: false,
};

export const limitSlice = createSlice({
    name: 'limit',
    initialState,
    reducers: {
        clearAddError(state) {
            state.isAddError = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(limitActions.limitWord.pending, (state: LimitState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(limitActions.limitWord.fulfilled, (state: LimitState, action) => {
                state.translateLimit = action.payload.translateLimit;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(limitActions.limitWord.rejected, (state: LimitState, action) => {
                state.translateLimit = 0;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(limitActions.limitWatch.pending, (state: LimitState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(limitActions.limitWatch.fulfilled, (state: LimitState, action) => {
                state.watchLimit = action.payload.watchLimit;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(limitActions.limitWatch.rejected, (state: LimitState, action) => {
                state.watchLimit = 0;
                state.isSuccess = false;
                state.isError = true;
                state.error = action.payload;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(limitActions.limitDictionary.pending, (state: LimitState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = '';
            })
            .addCase(limitActions.limitDictionary.fulfilled, (state: LimitState, action) => {
                state.addToDictionaryLimit = action.payload.addToDictionaryLimit;
                state.isSuccess = true;
                state.isError = false;
                state.error = '';
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(limitActions.limitDictionary.rejected, (state: LimitState, action) => {
                state.addToDictionaryLimit = 0;
                state.isSuccess = false;
                state.error = action.payload;
                state.isAddError = true;
                state.isLoading = false;
                state.isAuth = false;
            });
    },
});

export const { clearAddError } = limitSlice.actions;

export const limitSelector = (state: { limit: LimitState }) => state.limit;
