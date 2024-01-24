import { createSlice } from '@reduxjs/toolkit';
import * as dictionaryActions from './actions';
import { DictionaryState } from '@/state/dictionary/type';

const initialState: DictionaryState = {
    words: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    isAuth: false,
};

export const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dictionaryActions.getDictionary.pending, (state: DictionaryState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(dictionaryActions.getDictionary.fulfilled, (state: DictionaryState, action) => {
                state.words = action.payload;
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(dictionaryActions.getDictionary.rejected, (state: DictionaryState) => {
                state.isSuccess = false;
                state.isError = true;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(dictionaryActions.addWord.pending, (state: DictionaryState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(dictionaryActions.addWord.fulfilled, (state: DictionaryState, action) => {
                state.words = action.payload;
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(dictionaryActions.addWord.rejected, (state: DictionaryState) => {
                state.isSuccess = false;
                state.isError = true;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(dictionaryActions.deleteWord.pending, (state: DictionaryState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(dictionaryActions.deleteWord.fulfilled, (state: DictionaryState, action) => {
                state.words = action.payload;
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(dictionaryActions.deleteWord.rejected, (state: DictionaryState) => {
                state.isSuccess = false;
                state.isError = true;
                state.isLoading = false;
                state.isAuth = false;
            });
    },
});

export const dictionarySelector = (state: { dictionarySlice: DictionaryState }) => state.dictionarySlice;
