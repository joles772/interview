import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './layouts/Main';

import Home from './pages/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;