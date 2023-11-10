import * as React from 'react';

//Models
import { Employee } from '../../models/Employee';

//Mui, separate path imports to ensure optimal load time
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    employee: Employee
    onView: Function
    onDelete: Function
    onEdit: Function
}

export default function EmployeeCard({ employee, onView, onDelete, onEdit }: Props) {
    const handleGoToDetail = () => {
        onView(employee.id);
    }

    const handleDelete = () => {
        onDelete(employee.id);
    }

    const handleEdit = () => {
        onEdit(employee.id)
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
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" size="small" onClick={handleGoToDetail}>View</Button>
                <Button variant="contained" color="primary" size="small" onClick={handleEdit}>Edit</Button>
                <Button variant="contained" color="primary" size="small" onClick={handleDelete}>Delete</Button>
            </CardActions>
        </Card>
    );
}