import React, { useEffect } from 'react';

import { Theme, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../state/store';
import { getEmployees } from '../../state/app/appState';

import { Employee } from '../../models/Employee';

import { Typography } from '@mui/material'

import EmployeeView from '../../components/EmployeeView';

const useStyles = (theme: Theme) => {
    return {
  
    }
  }

function Home() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const employees = useSelector((state: RootState) => state.app.employees);
    const loading = useSelector((state: RootState) => state.app.loading);

    const dispatch = useDispatch<AppDispatch>();

    const handleGetEmployees = () => {
        dispatch(getEmployees());
    }

    useEffect(() => {
        handleGetEmployees();
    }, []);

    if(loading) {
        return <>
            Loading...
        </>
    }

    return (
        <>
            <Typography variant="h4">
                Employees:
            </Typography>
            {
                employees?.map( (employee: Employee) => <EmployeeView employee={employee}/>)
            }
        </>
    );
}

export default Home;
