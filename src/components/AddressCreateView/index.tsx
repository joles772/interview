import { useState } from 'react';

//Id generator
import { v4 as uuidv4 } from 'uuid';

//Mui, separate path imports to ensure optimal load time
import { Theme } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const useStyles = (theme: Theme) => {
    return {
        root: {
            padding: theme.spacing(2)
        },
        textField: {
            width: '100%'
        },
        controlsWrapper: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        title: {
            marginBottom: theme.spacing(1)
        }
    }
}


interface Props {
    onAdd: Function
}

function EmployeeView({ onAdd }: Props) {

    const theme = useTheme();

    const styles = useStyles(theme);

    //local id for rendering/deleting addresses. Not sent to the api;
    const localId = uuidv4();

    const [streetName, setStreetName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [stateValue, setStateValue] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = () => {
        onAdd({
            localId,
            streetName,
            postalCode,
            apartmentNumber,
            state: stateValue,
            country
        });
        setStreetName('');
        setPostalCode('');
        setApartmentNumber('');
        setStateValue('');
        setCountry('');
    }

    return (
        <Paper sx={styles.root}>
            <Typography variant='h6' sx={styles.title}>Add New Address</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Street Name"
                        variant="outlined"
                        value={streetName}
                        onChange={(event: any) => setStreetName(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Postal Code"
                        variant="outlined"
                        value={postalCode}
                        onChange={(event: any) => setPostalCode(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="number"
                        label="Apartment Number"
                        variant="outlined"
                        value={apartmentNumber}
                        onChange={(event: any) => setApartmentNumber(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="State"
                        variant="outlined"
                        value={stateValue}
                        onChange={(event: any) => setStateValue(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        type="text"
                        label="Country"
                        variant="outlined"
                        value={country}
                        onChange={(event: any) => setCountry(event.target.value)}
                        sx={styles.textField}
                    />
                </Grid>
            </Grid>
            <Box sx={styles.controlsWrapper}>
                <Button variant="contained" color="primary" type="button" onClick={handleSubmit}>
                    Add
                </Button>
            </Box>
        </Paper>
    )
}


export default EmployeeView;