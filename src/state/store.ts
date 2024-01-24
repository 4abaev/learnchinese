import { bindActionCreators, combineReducers, configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import * as authActions from './auth/actions';
import * as limitActions from './limitation/actions';
import * as dictionaryActions from './dictionary/actions';
import * as testActions from './test/actions';
import { authSlice } from './auth/slice';
import { limitSlice } from './limitation/slice';
import { tariffSlice } from './tariff/slice';
import { subscriptionSlice } from './subscription/slice';
import { dictionarySlice } from './dictionary/slice';
import { testSlice } from '@/state/test/slice';

export const combineActions = {
    ...authActions,
    ...limitActions,
    ...dictionaryActions,
    ...testActions,
};

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice.reducer,
        tariffs: tariffSlice.reducer,
        limit: limitSlice.reducer,
        subscription: subscriptionSlice.reducer,
        dictionary: dictionarySlice.reducer,
        test: testSlice.reducer,
    }),
});

export const useAppSelector: TypedUseSelectorHook<RTK.RootState> = useSelector;

export function useAppDispatch() {
    return useDispatch<RTK.AppDispatch>();
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(combineActions, dispatch), [dispatch]);
};
