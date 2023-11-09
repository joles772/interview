import React, { useState } from 'react';

import { Paper, Typography, TextField, Button } from '@mui/material'

import { Employee } from '../../models/Employee';

interface Props {
    onAdd: Function
}

function EmployeeView (props: Props) {

    const { onAdd } = props;

    const [ streetName, setStreetName ] = useState(''); 
    const [ postalCode, setPostalCode ] = useState(''); 
    const [ apartmentNumber, setApartmentNumber ] = useState(''); 
    const [ stateValue, setStateValue ] = useState(''); 
    const [ country, setCountry] = useState(''); 

    const handleSubmit = () => {
        onAdd({
            streetName,
            postalCode,
            apartmentNumber,
            state: stateValue,
            country
        })
    } 

    return (
        <Paper>
            <h4>Address Create</h4>
            <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Street Name"
                    variant="outlined"
                    value={streetName}
                    onChange={(event: any) => setStreetName(event.target.value)}
            />
            <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Postal Code"
                    variant="outlined"
                    value={postalCode}
                    onChange={(event: any) => setPostalCode(event.target.value)}
            />
            <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="number"
                    label="Apartment Number"
                    variant="outlined"
                    value={apartmentNumber}
                    onChange={(event: any) => setApartmentNumber(event.target.value)}
            />
            <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="State"
                    variant="outlined"
                    value={stateValue}
                    onChange={(event: any) => setStateValue(event.target.value)}
            />
            <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Country"
                    variant="outlined"
                    value={country}
                    onChange={(event: any) => setCountry(event.target.value)}
            />
            <Button variant="contained" color="primary" type="button" onClick={handleSubmit}>
                    Save
                </Button>
                <br />
        </Paper>
    )
}


export default EmployeeView;