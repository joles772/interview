import { useState, useEffect } from 'react';

//Id generator
import { v4 as uuidv4 } from 'uuid';

//Components
import AddressCreateView from '../../components/AddressCreateView';
import AddressCard from '../../components/AddressCard';
import PageLoading from '../../components/PageLoading';

//Models
import { Address, AddressWithId } from '../../models/Address';
import { Employee } from '../../models/Employee';

//Mui, separate path imports to ensure optimal load time
import Grid from '@mui/material/Grid';
import { Theme }  from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'



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

interface Props {
    id?: String
    employee?: Employee
    loading: boolean,
    onSubmit: Function,
    onCancel?: Function
}

function EmployeeForm({id, employee, loading, onSubmit, onCancel}: Props) {
    const theme = useTheme();

    const styles = useStyles(theme);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [addresses, setAddresses] = useState<AddressWithId[]>([]);

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setAddresses([]);
    }

    useEffect(() => {
        if (id && employee) {
            setFirstName(`${employee?.firstName}`);
            setLastName(`${employee?.lastName}`);
            setEmail(`${employee?.email}`);
            setPhoneNumber(`${employee?.email}`);
            //Map address to add unique id for editing/rendering. Can't add uuid in reducer because a reducer must be deterministic.
            let mappedAddresses = employee?.addresses?.map((address: Address) => ({
                localId: uuidv4(),
                ...address
            }));
            setAddresses(mappedAddresses || []);
        } else {
            /* Reset state to default if employee does not exist.
               Required for when user navigates between edit and create pages. */
            clearForm()
        }
    }, [employee]);

    const handleSubmit = () => {
        //Map addesses, do not send localId to API
        let employee = {
            firstName,
            lastName,
            email,
            phoneNumber,
            addresses: addresses.map( (address: AddressWithId) => ({
                streetName: address.streetName,
                postalCode: address.postalCode,
                apartmentNumber: parseInt(`${address.apartmentNumber}`),
                state: address.state,
                country: address.country
            }))
        }
        onSubmit(employee);
        clearForm();
    }

    const handleCancel = () => {
        if(onCancel) {
            onCancel();
        }
    }

    const handleAddAddress = (address: AddressWithId) => {
        /*Create a shallow copy of arrray stored in addresses.
          Cannot opperate directly on useState() addresses*/
        let data = JSON.parse(JSON.stringify(addresses));

        data.push(address);

        setAddresses(data);
    }

    const handleDeleteAddress = (id: String) => {
        /*Create a shallow copy of arrray stored in addresses.
          Cannot opperate directly on useState() addresses*/
        let data = JSON.parse(JSON.stringify(addresses));

        let index = data.findIndex((address: AddressWithId) => address.localId == id);

        data.splice(index, 1);

        setAddresses(data);
    }

    if (loading) {
        return <>
            <PageLoading />
        </>
    }

    return (
        <>
            <Grid container spacing={2} sx={styles.spacing}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="First Name"
                        name='firstName'
                        variant="outlined"
                        value={firstName}
                        onChange={(event: any) => setFirstName(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Last Name"
                        name='lastName'
                        variant="outlined"
                        value={lastName}
                        onChange={(event: any) => setLastName(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Email"
                        name='email'
                        variant="outlined"
                        value={email}
                        onChange={(event: any) => setEmail(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Phone Number"
                        name='phoneNumber'
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(event: any) => setPhoneNumber(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
            </Grid>
            <Typography variant='h6' sx={styles.spacing}>Addresses:</Typography>
            <Grid container sx={styles.spacing} spacing={2}>
                {addresses.map((address: AddressWithId) => (
                    <Grid item xs={12} sm={6} md={3} key={address.localId}>
                        <AddressCard address={address} onDelete={handleDeleteAddress}/>
                    </Grid>
                ))}
            </Grid>

            <AddressCreateView onAdd={handleAddAddress} />
            <Box sx={styles.controlsWrapper}>
                {onCancel && <Button variant="contained" color="primary" type="button" onClick={handleCancel} sx={styles.button}>
                        Cancel
                    </Button>
                }
                <Button variant="contained" color="primary" type="button" onClick={handleSubmit}>
                    Save
                </Button>
            </Box>
        </>
    );
}

export default EmployeeForm;
