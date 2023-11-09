import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import { useTheme, Theme } from '@mui/material';

import { Link } from 'react-router-dom'

const useStyles = (theme: Theme) => {
  return {

  }
}

function Header() {
  const theme = useTheme();

  const styles = useStyles(theme);

  return (
    <AppBar position="sticky">
        <Link to="/">Home</Link>
        <Link to="/create-employee">Create Employee</Link>
    </AppBar>
  );
}
export default Header;