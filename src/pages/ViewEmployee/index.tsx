import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import PageLoading from '../../components/PageLoading'

import { Grid, Theme, useTheme, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../state/store';
import { clearEmployee, getEmployee } from '../../state/employee/employeeState';

import { Address } from '../../models/Address';

import { Typography } from '@mui/material'

import EmployeeCard from '../../components/EmployeeCard';
import AppLoading from '../../components/AppLoading';
import AddressCard from '../../components/AddressCard';

const useStyles = (theme: Theme) => {
    return {
        title: {
            marginBottom: theme.spacing(2)
        },
        spacing: {
            marginBottom: theme.spacing(2)
        },
        paper: {
            padding: theme.spacing(2)
        },
        infoWrapper: {
            marginBottom: theme.spacing(2),
            maxWidth: '600px'
        }
    }
}

function ViewEmployee() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const employee = useSelector((state: RootState) => state.employee.employee);
    const loading = useSelector((state: RootState) => state.app.loading);

    const dispatch = useDispatch<AppDispatch>();

    let { id } = useParams();

    if (!id) {
        return <>
            Not Found
        </>
    }

    const handleGetEmployee = () => {
        dispatch(getEmployee(id as String));
    }

    useEffect(() => {
        handleGetEmployee();
    }, []);

    useEffect(() => {
        return () => {
            //Clear employee state on unmount
            dispatch(clearEmployee());
        }
    }, [])

    if (loading) {
        return <PageLoading/>;
    }

    return (
        <>
            <Typography variant="h4" sx={styles.title}>
                Employee Data:
            </Typography>
            {/* <Paper sx={styles.paper}> */}
            <Grid container spacing={2} sx={styles.infoWrapper}>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Id:</strong> {employee?.id}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>First Name:</strong> {employee?.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Last Name:</strong> {employee?.lastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Email:</strong> {employee?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Phone Number:</strong> {employee?.phoneNumber}</Typography>
                </Grid>
            </Grid>

            {/* </Paper> */}
            {/* <Paper sx={styles.paper}> */}
            <Typography variant='h5' sx={styles.spacing}>Addresses:</Typography>
            <Grid container sx={styles.spacing}>
                {employee?.addresses?.map((address: Address) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <AddressCard address={address} />
                    </Grid>
                ))}
            </Grid>
            {/* </Paper> */}
        </>
    );
}

export default ViewEmployee;
