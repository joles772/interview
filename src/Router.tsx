import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/Main';

import Home from './pages/Home';
import CreateEmployee from './pages/CreateEmployee';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>} />
          <Route path='/create-employee' element={<CreateEmployee/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;