import { configureStore } from "@reduxjs/toolkit";
import appReducer from './app/appState.ts'
import employeeReducer from './employee/employeeState.ts'


export const store = configureStore({
    reducer: {
        app: appReducer,
        employee: employeeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch