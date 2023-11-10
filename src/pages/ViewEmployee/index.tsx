import { useEffect } from 'react';

//Routing
import { useParams } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { clearEmployee, getEmployee } from '../../state/employee/employeeState';

//Models
import { Address } from '../../models/Address';

//Components
import AddressCard from '../../components/AddressCard';
import PageLoading from '../../components/PageLoading';

//Mui, separate path imports to ensure optimal load time
import { Theme } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const useStyles = (theme: Theme) => {
    return {
        title: {
            marginBottom: theme.spacing(2)
        },
        spacing: {
            marginBottom: theme.spacing(2)
        },
        infoWrapper: {
            marginBottom: theme.spacing(2),
            maxWidth: '600px'
        }
    }
}

function ViewEmployee() {
    const theme = useTheme();

    const styles = useStyles(theme);

    const employee = useSelector((state: RootState) => state.employee.employee);
    const loading = useSelector((state: RootState) => state.employee.loading);

    const dispatch = useDispatch<AppDispatch>();

    let { id } = useParams();

    if (!id) {
        return <>
            Not Found
        </>
    }

    const handleGetEmployee = () => {
        dispatch(getEmployee(id as String));
    }

    useEffect(() => {
        handleGetEmployee();
    }, []);

    useEffect(() => {
        return () => {
            //Clear employee state on unmount
            dispatch(clearEmployee());
        }
    }, []);

    if (loading) {
        return <PageLoading />;
    }

    return (
        <>
            <Typography variant="h4" sx={styles.title}>
                Employee Data:
            </Typography>
            <Grid container spacing={2} sx={styles.infoWrapper}>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Id:</strong> {employee?.id}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>First Name:</strong> {employee?.firstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Last Name:</strong> {employee?.lastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Email:</strong> {employee?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='body1'><strong>Phone Number:</strong> {employee?.phoneNumber}</Typography>
                </Grid>
            </Grid>

            <Typography variant='h5' sx={styles.spacing}>Addresses:</Typography>
            <Grid container sx={styles.spacing} spacing={2}>
                {/*Using index as key here as no edits/updates will be needed*/}
                {employee?.addresses?.map((address: Address, index: number) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <AddressCard address={address} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default ViewEmployee;
