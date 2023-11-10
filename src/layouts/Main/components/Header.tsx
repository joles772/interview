import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import { useTheme, Theme, Button, Container, Link, Typography } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom'

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

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Link component={RouterLink} to="/"><Button variant='text' sx={styles.link}>View Employees</Button></Link>
        <Link component={RouterLink} to="/create-employee" sx={styles.link}><Button variant='text' sx={styles.link}>Create Employee</Button></Link>
      </Container>
        
    </AppBar>
  );
}
export default Header;