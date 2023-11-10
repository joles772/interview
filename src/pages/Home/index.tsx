import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Grid, Theme, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../state/store';
import { getEmployees } from '../../state/app/appState';

import { Employee } from '../../models/Employee';

import { Typography, CircularProgress } from '@mui/material'

import EmployeeCard from '../../components/EmployeeCard';
import PageLoading from '../../components/PageLoading';

const useStyles = (theme: Theme) => {
    return {
        title: {
            marginBottom: theme.spacing(2)
        }
    }
}

function Home() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const navigate = useNavigate();

    const employees = useSelector((state: RootState) => state.app.employees);
    const loading = useSelector((state: RootState) => state.app.loading);

    const dispatch = useDispatch<AppDispatch>();

    const handleGetEmployees = () => {
        dispatch(getEmployees());
    }

    const handleGoToDetail = (id: String) => {
        navigate(`/view-employee/${id}`);
    }

    useEffect(() => {
        handleGetEmployees();
    }, []);

    if (loading) {
        return <PageLoading/>;
    }

    return (
        <>
            <Typography variant="h4" sx={styles.title}>
                Employees:
            </Typography>
            
            {
                employees?.map((employee: Employee) => <Grid container>
                <Grid item xs={12} sm={6} md={3}>
                    <EmployeeCard employee={employee} onView={handleGoToDetail}/>
                </Grid>
            </Grid>)
            }
        </>
    );
}

export default Home;
