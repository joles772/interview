import React, { useState } from 'react';

import { Grid, Theme, useTheme, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../state/store';
import { createEmployee } from '../../state/app/appState';

import { Employee } from '../../models/Employee';
import { Address } from '../../models/Address';

import { Typography, TextField, Button } from '@mui/material'
import AddressCreateView from '../../components/AddressCreateView';
import AddressCard from '../../components/AddressCard';
import PageLoading from '../../components/PageLoading';

const useStyles = (theme: Theme) => {
    return {
        spacing: {
            marginBottom: theme.spacing(2),
        },
        textField: {
            width: '100%'
        },
        controlsWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: theme.spacing(2)
        },
    }
}

function CreateEmployee() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const loading = useSelector((state: RootState) => state.app.loading);

    const dispatch = useDispatch<AppDispatch>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [addresses, setAddresses] = useState([]);

    const handleSubmit = () => {
        let employee = {
            firstName,
            lastName,
            email,
            phoneNumber,
            addresses: []
        }
        dispatch(createEmployee(employee));
        console.log('Data', employee)
    }

    const handleOnAdd = (address: Address) => {
        let data = JSON.parse(JSON.stringify(addresses));

        data.push(address);

        setAddresses(data);
    }

    if (loading) {
        return <>
            <PageLoading/>
        </>
    }

    return (
        <>
            <Typography variant="h4" sx={styles.spacing}>
                Create Employee:
            </Typography>
            <Grid container spacing={2} sx={styles.spacing}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="First Name"
                        name='firstName'
                        variant="outlined"
                        value={firstName}
                        onChange={(event: any) => setFirstName(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Last Name"
                        name='lastName'
                        variant="outlined"
                        value={lastName}
                        onChange={(event: any) => setLastName(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Email"
                        name='email'
                        variant="outlined"
                        value={email}
                        onChange={(event: any) => setEmail(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Phone Number"
                        name='phoneNumber'
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(event: any) => setPhoneNumber(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
            </Grid>
            <Typography variant='h6' sx={styles.spacing}>Addresses:</Typography>
            <Grid container sx={styles.spacing}>
                {addresses.map((address: Address) => (
                    <Grid item xs={12} sm={6} md={3}>
                        <AddressCard address={address} />
                    </Grid>
                ))}
            </Grid>

            <AddressCreateView onAdd={handleOnAdd}/>
            <Box sx={styles.controlsWrapper}>
                <Button variant="contained" color="primary" type="button" onClick={handleSubmit}>
                    Save
                </Button>
            </Box>
        </>
    );
}

export default CreateEmployee;
