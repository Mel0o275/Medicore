import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import BestSeller from "./Pages/BestSeller/BestSeller.jsx";
import ContactUs from "./Pages/ContactUs/ContactUs.jsx";
import DeliveryStatus from "./Pages/DeliveryStatus/DeliveryStatus.jsx";
import Cart from "./Pages/Cart/Cart";
import FeedbackPage from "./Pages/FeedBackPage/FeedbackPage";
import SignInPage from "./Pages/SignInPage/SignInPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import Profile from "./Pages/Profile/Profile";
import Questions from "./Pages/Questions/Questions";
import Shop from "./Pages/Shop/Shop";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import WishList from "./Pages/WishList/WishList";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Pages/Checkout/Checkout";

import NavbarPrimary from "./Components/Navbar/NavbarPrimary";
import NavbarSecondary from "./Components/Navbar/NavbarSecondary";
import ThemeSwitcher from "./Components/ThemeSwitcher";

import PersonalTheme from "./Pages/ProfilePages/PersonalTheme";
import PersonalInfo from "./Pages/ProfilePages/PersonalInfo";
import PersonalSecurity from "./Pages/ProfilePages/PersonalSecurity";
import PersonalNotifications from "./Pages/ProfilePages/PersonalNotifications";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";

import LoadingScreenAnimation from "./Pages/LoadingScreenAnimation/LoadingScreenAnimation";


import Dashboard from "./Pages/DashBoard";
import MainDash from "./Pages/DashBoardPages/MainDash";
import InventoryDash from "./Pages/DashBoardPages/InventoryDash";
import OrdersDash from "./Pages/DashBoardPages/OrdersDash";
import EmployeesDash from "./Pages/DashBoardPages/EmployeesDash";
import SettingsDash from "./Pages/DashBoardPages/SettingsDash";

/* -------------------------- Toast --------------------------- */

import { Toaster } from "react-hot-toast";
/* -------------------------- Theme --------------------------- */
import { buildMuiTheme } from "./Themes/Theme";
import useTheme from "./Store/useTheme";
import { ThemeProvider } from "@mui/material";
import ProtectedRoute from "./Components/protectedRoute/ProtectedRoute.jsx";

const muiTheme = buildMuiTheme();

function App() {
  const { mode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider theme={muiTheme}>
      <Router>
        <LoadingScreenAnimation
          isVisible={isLoading}
          onFinish={() => setIsLoading(false)}
        />

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              animation: "slideInRight 0.4s",
            },
          }}
        />
        <NavbarSecondary />
        <NavbarPrimary />
        <ThemeSwitcher />
        <div className="">
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bestseller" element={<BestSeller />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/delivery" element={<DeliveryStatus />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/shop/productdetails/:id" element={<ProductDetailsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/Profile" element={<Profile />}>
                <Route index element={<PersonalInfo />} />
                <Route path="Info" element={<PersonalInfo />} />
                <Route path="Security" element={<PersonalSecurity />} />
                <Route path="Themes" element={<PersonalTheme />} />
                <Route
                  path="Notifications"
                  element={<PersonalNotifications />}
                />
              </Route>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route path="/DashBoard" element={<Dashboard />}>
              <Route index element={<MainDash />} />
              <Route path="Inventory" element={<InventoryDash />} />
              <Route path="Orders" element={<OrdersDash />} />
              <Route path="Employees" element={<EmployeesDash />} />
              <Route path="Settings" element={<SettingsDash />} />
            </Route>
            <Route path="/questions" element={<Questions />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/wishlist" element={<WishList />} />
            {/* <Route path="/checkout" element={<Checkout />} /> */}
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
