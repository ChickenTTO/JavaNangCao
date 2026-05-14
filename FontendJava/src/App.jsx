import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/signUp";
import DashboardLayout from "./layouts/DashboardLayout";
import Menu from "./pages/Dashboard/Menu/menu";
import AboutUs from "./pages/Dashboard/AboutUs/aboutUs";
import Contact from "./pages/Dashboard/Contact/contact";
import Cart from "./pages/Dashboard/Cart/cart";

import MenClothes from "./pages/Dashboard/Category/MenClothes";
import WomanClothes from "./pages/Dashboard/Category/WomanClothes";
import MobilePhone from "./pages/Dashboard/Category/MobilePhone";
import Computer from "./pages/Dashboard/Category/Computer";
import Sport from "./pages/Dashboard/Category/Sport";
import Beauty from "./pages/Dashboard/Category/Beauty";
import Shoes from "./pages/Dashboard/Category/Shoes";
import Furniture from "./pages/Dashboard/Category/Furniture";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth pages - không có header */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Dashboard pages - có header chung */}
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<Navigate to="/dashboard/menu" replace />}
            />
            <Route path="/dashboard/menu" element={<Menu />} />
            <Route path="/dashboard/about" element={<AboutUs />} />
            <Route path="/dashboard/contact" element={<Contact />} />
            <Route path="/dashboard/cart" element={<Cart />} />

            {/* Category pages */}
            <Route
              path="/dashboard/category/men-clothes"
              element={<MenClothes />}
            />
            <Route
              path="/dashboard/category/woman-clothes"
              element={<WomanClothes />}
            />
            <Route
              path="/dashboard/category/mobile-phone"
              element={<MobilePhone />}
            />
            <Route path="/dashboard/category/computer" element={<Computer />} />
            <Route path="/dashboard/category/sport" element={<Sport />} />
            <Route path="/dashboard/category/beauty" element={<Beauty />} />
            <Route path="/dashboard/category/shoes" element={<Shoes />} />
            <Route path="/dashboard/category/furniture" element={<Furniture />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
