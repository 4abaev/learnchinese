import { createSlice } from '@reduxjs/toolkit';
import * as testActions from './actions';
import { TestState } from '@/state/test/type';

const initialState: TestState = {
    words: [],
    isSuccess: false,
    isError: false,
    isLoading: true,
    isAuth: false,
};

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(testActions.getTest.pending, (state: TestState) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(testActions.getTest.fulfilled, (state: TestState, action) => {
                state.words = action.payload;
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(testActions.getTest.rejected, (state: TestState) => {
                state.isSuccess = false;
                state.isError = true;
                state.isLoading = false;
                state.isAuth = false;
            })
            .addCase(testActions.endTest.pending, (state: TestState) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(testActions.endTest.fulfilled, (state: TestState, action) => {
                state.words = action.payload;
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
                state.isAuth = true;
            })
            .addCase(testActions.endTest.rejected, (state: TestState) => {
                state.isSuccess = false;
                state.isError = true;
                state.isLoading = false;
                state.isAuth = false;
            });
    },
});

export const testSelector = (state: { testSlice: TestState }) => state.testSlice;
