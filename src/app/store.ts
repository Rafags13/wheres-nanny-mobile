import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import nannyListReducer, { loadInitialHomeInformation } from '../features/listNanny/listNannySlice';
import favoriteListNannySlice from '../features/listNanny/favoriteListNannySlice';
import { getCurrentUser } from '../storage';
import { TypeOfUser } from '../assets/enums/TypeOfUser';

export const store = configureStore({
    reducer: {
        userInformation: nannyListReducer,
        favoriteNannies: favoriteListNannySlice
    },
});

if (getCurrentUser().typeOfUser == TypeOfUser.CommonUser) {
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