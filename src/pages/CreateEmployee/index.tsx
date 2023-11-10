import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import { getEmployee } from '../../state/employee/employeeState';

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

//Adds localId field to Address type. This field is used for rendering/editing the addresses.
interface AddressWithId extends Address {
    localId: string
}

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
        button: {
            marginRight: theme.spacing(1)
        }
    }
}

function CreateEmployee() {
    const theme = useTheme();

    const styles = useStyles(theme);

    let { id } = useParams();

    const employee = useSelector((state: RootState) => state.employee.employee);
    const loading = useSelector((state: RootState) => state.employee.loading);

    const dispatch = useDispatch<AppDispatch>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [addresses, setAddresses] = useState<AddressWithId[]>([]);

    const handleGetEmployee = () => {
        dispatch(getEmployee(id as String));
    }

    useEffect(() => {
        if(id) {
            handleGetEmployee();
        }
    }, []);

    useEffect(() => {
        setFirstName(`${employee?.firstName}`);
        setLastName(`${employee?.lastName}`);
        setEmail(`${employee?.email}`);
        setPhoneNumber(`${employee?.email}`);
        //Map address to add unique id for editing/rendering
        let mappedAddresses = employee?.addresses?.map((address: Address) => ({
            localId: uuidv4(),
            ...address
        }));
        console.log('mappedAddresses', mappedAddresses);
        setAddresses(mappedAddresses || []);
    }, [employee]);

    const handleSubmit = () => {
        let employee = {
            firstName,
            lastName,
            email,
            phoneNumber,
            addresses: []
        }
        if(id) {

        } else {
            dispatch(createEmployee(employee));
        }
    }

    const handleOnAdd = (address: AddressWithId) => {
        /*Create a shallow copy of arrray stored in addresses.
          Cannot opperate directly on useState() addresses*/
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
                { id ? 'Edit' : 'Create'} Employee:
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
                {addresses.map((address: AddressWithId) => (
                    <Grid item xs={12} sm={6} md={3} key={address.localId}>
                        <AddressCard address={address} />
                    </Grid>
                ))}
            </Grid>

            <AddressCreateView onAdd={handleOnAdd}/>
            <Box sx={styles.controlsWrapper}>
                {
                <Button variant="contained" color="primary" type="button" onClick={handleSubmit} sx={styles.button}>
                    Cancel
                </Button>
                }
                <Button variant="contained" color="primary" type="button" onClick={handleSubmit}>
                    Save
                </Button>
            </Box>
        </>
    );
}

export default CreateEmployee;
