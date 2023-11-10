//Mui, separate path imports to ensure optimal load time
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function PageLoading() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '40vh'
        }}>
            <CircularProgress color="inherit" />
        </Box>
    );
}