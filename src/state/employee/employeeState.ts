import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../models/Employee';

import { getEmployees } from '../app/appState';

interface EmployeeState {
    employee: Employee | null
    loading: boolean
}

const initialState: EmployeeState = {
    employee: null,
    loading: false
}

//State for fetching, deleting, and editing employee
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        clearEmployee: (state: EmployeeState) => {
            state.employee = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEmployee.pending, (state: EmployeeState) => {
                state.loading = true;
            })
            .addCase(getEmployee.fulfilled, (state: EmployeeState, action: PayloadAction<Employee>) => {
                state.employee = action.payload;
                state.loading = false;
            })
            .addCase(deleteEmployee.pending, (state: EmployeeState) => {
                state.loading = true;
            })
            .addCase(deleteEmployee.fulfilled, (state: EmployeeState) => {
                state.employee = null;
                state.loading = false;
            });
    }
});

export const getEmployee = createAsyncThunk(
    "employee/getEmployee",
    async (id: String) => {
        let response = await fetch(`https://procom-interview-employee-test.azurewebsites.net/Employee/${id}`, {
            method: "GET",
        });
        return response.json();
    }
);

export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee",
    async (id: String, { dispatch }: any) => {
        await fetch(`https://procom-interview-employee-test.azurewebsites.net/Employee/${id}`, {
            method: "DELETE",
        });

        //Refetch the list of employees
        dispatch(getEmployees())
    }
);

export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee",
    async (employee: Employee) => {
        let response = await fetch(`https://procom-interview-employee-test.azurewebsites.net/Employee/${employee.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
        });
        return response.json();
    }
);

export const { clearEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;


