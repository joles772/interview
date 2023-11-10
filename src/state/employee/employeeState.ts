import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Employee } from '../../models/Employee';

interface EmployeeState {
    employee: Employee | null
    loading: boolean
}

const initialState: EmployeeState = {
    employee: null,
    loading: false
}

const employeeSlice = createSlice({
    name: 'app',
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
        // .addCase(createEmployee.pending, (state: EmployeeState) => {
        //     state.loading = true;
        // })
        // .addCase(createEmployee.fulfilled, (state: EmployeeState) => {
        //     state.loading = false;
        // })
        ;
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

// export const createEmployee = createAsyncThunk(
//     "employee/createEmployee",
//     async (employee: Employee) => {
//         await fetch('https://procom-interview-employee-test.azurewebsites.net/Employee', {
//             method: "POST", 
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(employee), 
//           });
//     }
// )

export const { clearEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;

