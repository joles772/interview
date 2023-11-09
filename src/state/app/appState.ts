import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AppState {
    value: number
    loading: boolean
}

const initialState: AppState = {
    value: 0,
    loading: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setValue: (state: AppState, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(makeApiCall.pending, (state: AppState) => {
            state.loading = true;
        })
        .addCase(makeApiCall.fulfilled, (state: AppState, action: PayloadAction<number>) => {
            state.value = action.payload;
            state.loading = false;
        });
    }
});

export const makeApiCall = createAsyncThunk(
    "app/makeApiCall",
    async (value: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return value;
    }
)

export const { setValue } = appSlice.actions;

export default appSlice.reducer;