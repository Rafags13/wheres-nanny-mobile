import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import nannyListReducer, { loadInitialHomeInformation } from '../features/listNannySlice';

export const store = configureStore({
    reducer: {
        userInformation: nannyListReducer,
    },
});

store.dispatch(loadInitialHomeInformation());

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;