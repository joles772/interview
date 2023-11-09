import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../models/Employee';

interface AppState {
    employees: [Employee]
    loading: boolean
}

const initialState: AppState = {
    employees: [],
    loading: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setValue: (state: AppState, action: PayloadAction<number>) => {
            //state.value = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(makeApiCall.pending, (state: AppState) => {
            state.loading = true;
        })
        .addCase(makeApiCall.fulfilled, (state: AppState, action: PayloadAction<number>) => {
            //state.value = action.payload;
            state.loading = false;
        })
        .addCase(getEmployees.pending, (state: AppState) => {
            state.loading = true;
        })
        .addCase(getEmployees.fulfilled, (state: AppState, action: PayloadAction<[Employee]>) => {
            state.employees = action.payload;
            state.loading = false;
        })
        .addCase(createEmployee.pending, (state: AppState) => {
            state.loading = true;
        })
        .addCase(createEmployee.fulfilled, (state: AppState) => {
            state.loading = false;
        })
        ;
    }
});

export const makeApiCall = createAsyncThunk(
    "app/makeApiCall",
    async (value: number) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return value;
    }
)

export const getEmployees = createAsyncThunk(
    "app/getEmployees",
    async () => {
        let response = await fetch('https://procom-interview-employee-test.azurewebsites.net/Employee', {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
            },
          });
        return response.json();
    }
)

export const createEmployee = createAsyncThunk(
    "app/createEmployee",
    async (employee: Employee) => {
        await fetch('https://procom-interview-employee-test.azurewebsites.net/Employee', {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employee), 
          });
    }
)

export const { setValue } = appSlice.actions;

export default appSlice.reducer;


