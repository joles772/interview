//Models
import { AddressWithId, Address } from '../../models/Address';

//Mui, separate path imports to ensure optimal load time
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface Props {
    address: AddressWithId,
    onDelete?: Function
}

export default function EmployeeCard({ address, onDelete }: Props) {
    const handleDelete = () => {
        if(onDelete && address?.localId){
            onDelete(address?.localId);
        }
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {address.apartmentNumber && `${address.apartmentNumber}-`}{address.streetName}, 
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {address.state}, {address.country}, {address.postalCode}
                </Typography>
                {onDelete && <CardActions>
                    <Button variant="contained" color="primary" onClick={handleDelete}>Delete</Button>
                </CardActions>}
            </CardContent>
        </Card>
    );
}