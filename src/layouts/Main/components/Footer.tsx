import { Theme, useTheme } from '@mui/material';

//Mui
import Box from "@mui/material/Box";

const useStyles = (theme: Theme) => {
  return {

  }
}

const Footer = () => {

  const theme = useTheme();

  const styles= useStyles(theme)

  return (
    <Box>
        Footer
    </Box>
  )
};

export default Footer;