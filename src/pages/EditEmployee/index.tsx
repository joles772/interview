import { useEffect } from 'react';

//Routing
import { useParams } from 'react-router-dom'

//Redux
import { clearEmployee, getEmployee, updateEmployee } from '../../state/employee/employeeState';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';

//Models
import { Employee } from '../../models/Employee';

//Components
import PageLoading from '../../components/PageLoading';
import EmployeeForm from '../../components/EmployeeForm';

//Mui, separate path imports to ensure optimal load time
import { Theme } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography'




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

function EditEmployee() {
    const theme = useTheme();

    const styles = useStyles(theme);

    let { id } = useParams();

    const employee = useSelector((state: RootState) => state.employee.employee);
    const loading = useSelector((state: RootState) => state.employee.loading);

    const dispatch = useDispatch<AppDispatch>();

    const handleGetEmployee = () => {
        dispatch(getEmployee(id as String));
    }

    useEffect(() => {
        if (id) {
            handleGetEmployee();
        }
    }, []);

    useEffect(() => {
        return () => {
            dispatch(clearEmployee());
        }
    }, []);

    const handleSubmit = (employee: Employee) => {
        let data = {
            id: parseInt(id as string),
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            addresses: employee.addresses
        }
        dispatch(updateEmployee(data));
    }

    if (loading) {
        return <>
            <PageLoading />
        </>
    }

    return (
        <>
            <Typography variant="h4" sx={styles.spacing}>
                Edit Employee:
            </Typography>
            <EmployeeForm id={id as String} employee={employee as Employee} loading={loading} onSubmit={handleSubmit}/>
        </>
    );
}

export default EditEmployee;
