import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { DisplayInformationHomeUser } from '../dto/Person/DisplayInformationHomeUser';
import { FindCommonUserServicesDto } from '../dto/Person/FindCommonUserServicesDto';
import { fetchUserHomeInformation } from './listNannyAPI';

export interface UserHomeInformationState {
    value: DisplayInformationHomeUser,
    status: 'idle' | 'loading' | 'failed'
}

const initialState: UserHomeInformationState = {
    value: {
        mostRecentService: null,
        nannyListOrderedByFilter: []
    },
    status: 'idle',
}

export const loadInitialHomeInformation = createAsyncThunk(
    'Person/GetUserHomeInformation',
    async () => {
        const response = await fetchUserHomeInformation();
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
                state.status = 'loading';
            })
            .addCase(loadInitialHomeInformation.fulfilled, (state, action) => {
                state.status = 'idle';
                state.value = action.payload;
            })
            .addCase(loadInitialHomeInformation.rejected, (state) => {
                state.status = 'failed';
            });
    }
})

export const { setUpdatedData } = listNannySlice.actions;

export const selectUserInfo = (state: RootState) => state.userInformation.value;

export default listNannySlice.reducer;