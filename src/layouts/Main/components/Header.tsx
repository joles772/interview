import AppBar from '@mui/material/AppBar';

//Routing
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

//Redux
import { useDispatch } from 'react-redux';

//Mui, separate path imports to ensure optimal load time
import useTheme from '@mui/material/styles/useTheme';
import { Theme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


const useStyles = (theme: Theme) => {
  return {
    link: {
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(1)
    }
  }
}

function Header() {
  const theme = useTheme();

  const styles = useStyles(theme);

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();


  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Link component={RouterLink} to="/"><Button variant='text' sx={styles.link}>View Employees</Button></Link>
        <Link component={RouterLink} sx={styles.link} to="/create-employee"><Button variant='text' sx={styles.link}>Create Employee</Button></Link>
      </Container>
        
    </AppBar>
  );
}
export default Header;