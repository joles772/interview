import { Outlet, /*Link*/ } from "react-router-dom";

//Components
import Header from './components/Header'
import Footer from './components/Footer'

//Mui, separate path imports to ensure optimal load time
import { Theme } from "@mui/material/styles";
import useTheme from "@mui/material/styles/useTheme";
import Container from "@mui/material/Container";

const useStyles = (theme: Theme) => {
  return {
    contentWrapper: {
      paddingTop: theme.spacing(2)
    }
  }
}

const Main = () => {
  const theme = useTheme();

  const styles = useStyles(theme);

  return (
    <>
      <Header />
      <Container sx={styles.contentWrapper}>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
};

export default Main;