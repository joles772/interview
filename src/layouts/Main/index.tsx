import { Outlet, Link } from "react-router-dom";

//Components
import Header from './components/Header'
import Footer from './components/Footer'

//Mui
import { Container } from "@mui/material";

const Main = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
};

export default Main;