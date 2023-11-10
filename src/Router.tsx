import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/Main';

import Home from './pages/Home';
import CreateEmployee from './pages/CreateEmployee';
import ViewEmployee from './pages/ViewEmployee';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home/>} />
          <Route path='/create-employee' element={<CreateEmployee/>} />
          <Route path='/view-employee/:id' element={<ViewEmployee/>} />
          <Route path='/edit-employee/:id' element={<CreateEmployee/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;