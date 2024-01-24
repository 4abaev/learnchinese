import { createSlice } from '@reduxjs/toolkit';
import { SubscriptionState } from './type';
import { designSubscribe, loadingUserSubscriptions } from './action';

const initialState: SubscriptionState = {
    subscriptions: [],
    error: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
};

export const subscriptionSlice = createSlice({
    initialState,
    name: 'subscription',
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadingUserSubscriptions.pending, (state) => {
                state.error = '';
                state.isError = false;
                state.isLoading = true;
                state.isSuccess = false;
                state.subscriptions = [];
            })
            .addCase(loadingUserSubscriptions.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(loadingUserSubscriptions.fulfilled, (state, action) => {
                state.error = '';
                state.isError = false;
                state.isLoading = false;
                state.subscriptions = action.payload;
            })
            .addCase(designSubscribe.fulfilled, (state, action) => {
                state.error = '';
                state.isError = false;
                state.isLoading = false;
                state.subscriptions.push(action.payload);
            });
    },
});
