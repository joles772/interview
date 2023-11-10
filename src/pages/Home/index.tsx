import { useEffect } from 'react';

//Routing
import { useNavigate } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { getEmployees } from '../../state/app/appState';
import { deleteEmployee } from '../../state/employee/employeeState';

//Models
import { Employee } from '../../models/Employee';

//Components
import EmployeeCard from '../../components/EmployeeCard';
import PageLoading from '../../components/PageLoading';

//Mui, separate path imports to ensure optimal load time
import { Theme } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'


const useStyles = (theme: Theme) => {
    return {
        title: {
            marginBottom: theme.spacing(2)
        }
    }
}

function Home() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const navigate = useNavigate();

    const employees = useSelector((state: RootState) => state.app.employees);
    const appLoading = useSelector((state: RootState) => state.app.loading);
    const employeeLoading = useSelector((state: RootState) => state.employee.loading);

    const dispatch = useDispatch<AppDispatch>();

    const handleGetEmployees = () => {
        dispatch(getEmployees());
    }

    const handleGoToDetail = (id: String) => {
        navigate(`/view-employee/${id}`);
    }

    const handleDelete = (id: String) => {
        dispatch(deleteEmployee(id));
    }

    const handleEdit = (id: String) => {
        navigate(`/edit-employee/${id}`);
    }

    useEffect(() => {
        handleGetEmployees();
    }, []);

    if (appLoading || employeeLoading) {
        return <PageLoading />;
    }

    return (
        <>
            <Typography variant="h4" sx={styles.title}>
                Employees:
            </Typography>
            <Grid container spacing={2}>
                {
                    employees?.map((employee: Employee) => <Grid item xs={12} sm={6} md={3} key={employee.id}>
                        <EmployeeCard employee={employee} onView={handleGoToDetail} onDelete={handleDelete} onEdit={handleEdit} />
                    </Grid>)
                }
            </Grid>

        </>
    );
}

export default Home;
