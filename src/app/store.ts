import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import nannyListReducer, { loadInitialHomeInformation } from '../features/listNannySlice';
import favoriteListNannySlice from '../features/favoriteListNannySlice';
import { getCurrentUser } from '../storage';

export const store = configureStore({
    reducer: {
        userInformation: nannyListReducer,
        favoriteNannies: favoriteListNannySlice
    },
});

if (!getCurrentUser().isNanny) {
    store.dispatch(loadInitialHomeInformation());
}


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;