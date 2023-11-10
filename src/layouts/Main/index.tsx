import { Outlet, /*Link*/ } from "react-router-dom";

//Components
import Header from './components/Header'
import Footer from './components/Footer'

//Mui
import { Theme, useTheme, Container } from "@mui/material";

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