import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { DisplayInformationHomeUser } from '../dto/Person/DisplayInformationHomeUser';
import { fetchNannyListByFilter, fetchUserHomeInformation } from './listNannyAPI';

export interface UserHomeInformationState {
    value: DisplayInformationHomeUser,
    statusQuery: 'idle' | 'loading' | 'failed',
    statusList: 'idle' | 'loading';
    error: boolean,
}

const initialState: UserHomeInformationState = {
    value: {
        mostRecentService: null,
        nannyListOrderedByFilter: [],
    },
    statusList: 'idle',
    statusQuery: 'idle',
    error: false
}

export const loadInitialHomeInformation = createAsyncThunk(
    'Person/GetUserHomeInformation',
    async () => {
        const response = await fetchUserHomeInformation();
        return response.data;
    }
)

export const changeNannyListByFilter = createAsyncThunk(
    'Person/ChangeNannyListByFilter',
    async (filter: string) => {
        const response = await fetchNannyListByFilter(filter);
        return response.data;
    }
)

export const listNannySlice = createSlice({
    name: 'listNannt',
    initialState,
    reducers: {
        setUpdatedData: (state, action: PayloadAction<DisplayInformationHomeUser>) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadInitialHomeInformation.pending, (state) => {
                state.statusQuery = 'loading';
            })
            .addCase(loadInitialHomeInformation.fulfilled, (state, action: PayloadAction<DisplayInformationHomeUser>) => {
                state.statusQuery = 'idle';
                state.value = action.payload;
                state.error = action.payload.nannyListOrderedByFilter.length === 0;
            })
            .addCase(loadInitialHomeInformation.rejected, (state) => {
                state.statusQuery = 'failed';
            })
            .addCase(changeNannyListByFilter.pending, (state) => {
                state.statusList = 'loading';
            })
            .addCase(changeNannyListByFilter.fulfilled, (state, action) => {
                state.statusList = 'idle';
                state.value.nannyListOrderedByFilter = action.payload;
            })
    }
})

export const { setUpdatedData } = listNannySlice.actions;

export const selectUserInfo = (state: RootState) => state.userInformation.value;

export default listNannySlice.reducer;