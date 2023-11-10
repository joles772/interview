//import { Theme, useTheme } from '@mui/material';

//Mui, separate path imports to ensure optimal load time
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";

const useStyles = (theme: Theme) => {
  return {

  }
}

const Footer = () => {

  const theme = useTheme();

  const styles= useStyles(theme)

  return (
    <Box>
    </Box>
  )
};

export default Footer;