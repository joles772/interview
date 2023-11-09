import React from 'react';

import { Paper, Typography } from '@mui/material'

import { Employee } from '../../models/Employee';

interface Props {
    employee: Employee
}

function EmployeeView (props: Props) {

    const { employee } = props;

    return (
        <Paper>
            <Typography>
                {employee.firstName}
            </Typography>
            <Typography>
                {employee.lastName}
            </Typography>
            <Typography>
                {employee.email}
            </Typography>
            <Typography>
                {employee.phoneNumber}
            </Typography>
        </Paper>
    )
}


export default EmployeeView;