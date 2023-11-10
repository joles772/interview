import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Address } from '../../models/Address';

interface Props {
    address: Address,
    onDelete?: Function
}

export default function EmployeeCard({ address, onDelete }: Props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {address.streetName}, {address.postalCode}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {address.state}, {address.country}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {address.apartmentNumber}
                </Typography>
                {
                    //employee?.addresses.map((address: Address) => <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{address.streetName} {address.postalCode}</Typography>);
                }
                {onDelete && <CardActions>
                    <Button>Delete</Button>
                </CardActions>}
            </CardContent>
        </Card>
    );
}