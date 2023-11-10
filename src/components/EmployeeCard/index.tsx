import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { Employee } from '../../models/Employee';
import { Address } from '../../models/Address';

interface Props {
    employee: Employee,
    onView: Function
}

export default function EmployeeCard({ employee, onView }: Props) {

    const handleGoToDetail = () => {
        onView(employee.id);
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {employee.firstName} {employee.lastName}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {employee.email}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {employee.phoneNumber}
                </Typography>
                {
                    //employee?.addresses.map((address: Address) => <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{address.streetName} {address.postalCode}</Typography>);
                }
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="small" onClick={handleGoToDetail}>View</Button>
                <Button variant="contained" color="primary" size="small" onClick={handleGoToDetail}>Edit</Button>
                <Button variant="contained" color="primary" size="small" onClick={handleGoToDetail}>Delete</Button>
            </CardActions>
        </Card>
    );
}