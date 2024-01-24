import { createSlice } from '@reduxjs/toolkit';
import { TariffState } from './type';
import { getAllTariff } from './actions';

const initialState: TariffState = {
    list: [],
    error: '',
    isError: false,
    isLoading: false,
    isSuccess: false,
};

export const tariffSlice = createSlice({
    name: 'tariff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTariff.pending, (state) => {
                state.error = '';
                state.isError = false;
                state.isLoading = true;
                state.isSuccess = false;
                state.list = [];
            })
            .addCase(getAllTariff.rejected, (state, action) => {
                state.error = action.payload;
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
            })
            .addCase(getAllTariff.fulfilled, (state, action) => {
                state.error = '';
                state.isError = false;
                state.isLoading = false;
                state.list = action.payload;
            });
    },
});
