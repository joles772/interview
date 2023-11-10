import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../models/Employee';

interface AppState {
    employees: Employee[]
    loading: boolean
}

const initialState: AppState = {
    employees: [],
    loading: false
}

//State for employee list and create
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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

export const getEmployees = createAsyncThunk(
    "app/getEmployees",
    async () => {
        let response = await fetch('https://procom-interview-employee-test.azurewebsites.net/Employee', {
            method: "GET",
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

export default appSlice.reducer;


