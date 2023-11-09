import React, { useState } from 'react';

import { Theme, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../state/store';
import { createEmployee } from '../../state/app/appState';

import { Employee } from '../../models/Employee';
import { Address } from '../../models/Address';

import { Typography, TextField, Button } from '@mui/material'
import AddressCreateView from '../../components/AddressCreateView';

const useStyles = (theme: Theme) => {
    return {

    }
}

function CreateEmployee() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const loading = useSelector((state: RootState) => state.app.loading);

    const dispatch = useDispatch<AppDispatch>();

    const [ firstName, setFirstName ] = useState(''); 
    const [ lastName, setLastName ] = useState(''); 
    const [ email, setEmail ] = useState(''); 
    const [ phoneNumber, setPhoneNumber ] = useState(''); 

    const [ addresses, setAddresses ] = useState([]); 

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
            Loading...
        </>
    }

    return (
        <>
            <Typography variant="h4">
                Create Employee:
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="First Name"
                    name='firstName'
                    variant="outlined"
                    value={firstName}
                    onChange={(event: any) => setFirstName(event.target.value)}
                />
                <br />
                <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Last Name"
                    name='lastName'
                    variant="outlined"
                    value={lastName}
                    onChange={(event: any) => setLastName(event.target.value)}
                />
                <br />
                <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Email"
                    name='email'
                    variant="outlined"
                    value={email}
                    onChange={(event: any) => setEmail(event.target.value)}
                />
                <br />
                <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Phone Number"
                    name='phoneNumber'
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(event: any) => setPhoneNumber(event.target.value)}
                />
                <br />
                { addresses.map((address: Address) => <p>{address.streetName} {address.postalCode} {address.state} {address.country}</p>) }
                <AddressCreateView onAdd={handleOnAdd}/>
                <Button variant="contained" color="primary" type="button" onClick={handleSubmit}>
                    Save
                </Button>
            </form>
        </>
    );
}

export default CreateEmployee;
