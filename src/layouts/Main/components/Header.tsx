import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import { useTheme, Theme } from '@mui/material';

const useStyles = (theme: Theme) => {
  return {

  }
}

function Header() {
  const theme = useTheme();

  const styles = useStyles(theme);

  return (
    <AppBar position="sticky">
        Header
    </AppBar>
  );
}
export default Header;