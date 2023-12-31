//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { createEmployee } from '../../state/app/appState';

//Models
import { Employee } from '../../models/Employee';

//Components
import PageLoading from '../../components/PageLoading';

//Mui, separate path imports to ensure optimal load time
import { Theme } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography'
import EmployeeForm from '../../components/EmployeeForm';



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

    const loading = useSelector((state: RootState) => state.employee.loading);

    const dispatch = useDispatch<AppDispatch>();


    const handleSubmit = (employee: Employee) => {
        let data = {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            addresses: employee.addresses
        }
        dispatch(createEmployee(data));
    }

    if (loading) {
        return <>
            <PageLoading />
        </>
    }

    return (
        <>
            <Typography variant="h4" sx={styles.spacing}>
                Create Employee:
            </Typography>
            <EmployeeForm loading={loading} onSubmit={handleSubmit}/>
        </>
    );
}

export default CreateEmployee;
