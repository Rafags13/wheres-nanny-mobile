import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { addFavoriteNannyAsyncStorage, getAllNannies, removeFavoriteNannyAsyncStorage, storage } from "@storage/index";
import { NannyCardProps } from "./NannyCardList/NannyCard";

export type FavoritedNanny = NannyCardProps & {
    isFavorited: boolean
}

export interface FavoriteListNannyInformationState {
    listFavoriteNanny: FavoritedNanny[]
}

const initialState: FavoriteListNannyInformationState = {
    listFavoriteNanny: getAllNannies()
}

export const favoriteListNannySlice = createSlice({
    name: 'favoriteListNanny',
    initialState,
    reducers: {
        addFavoriteNanny: (state, action: PayloadAction<FavoritedNanny>) => {
            state.listFavoriteNanny.push(action.payload);
            addFavoriteNannyAsyncStorage(action.payload);
        },
        removingFavoriteFromNanny: (state, action: PayloadAction<number>) => {
            state.listFavoriteNanny = state.listFavoriteNanny.filter(nanny => nanny.id !== action.payload);
            removeFavoriteNannyAsyncStorage(action.payload);
        }
    }
});

export const selectNannyFavoriteList = (state: RootState) => state.favoriteNannies.listFavoriteNanny;

export const { addFavoriteNanny, removingFavoriteFromNanny } = favoriteListNannySlice.actions;

export default favoriteListNannySlice.reducer;