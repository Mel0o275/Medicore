import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import BestProducts from "./Pages/BestProducts/BestProducts";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Delivery from "./Pages/Delivery/Delivery";
import Feedback from "./Pages/Feedback/Feedback";
import Login from "./Pages/Login/Login";
import ProductDetailsPage from "./Pages/ProductDetailsPage/ProductDetailsPage";
import Profile from "./Pages/Profile/Profile";
import Questions from "./Pages/Questions/Questions";
import Shop from "./Pages/Shop/Shop";
import Signup from "./Pages/Signup/Signup";
import WishList from "./Pages/WishList/WishList";
import Footer from "./Components/Footer/Footer";

import NavbarPrimary from "./Components/Navbar/NavbarPrimary";
import NavbarSecondary from "./Components/Navbar/NavbarSecondary";
import ThemeSwitcher from "./Components/ThemeSwitcher";

import PersonalTheme from "./Pages/ProfilePages/PersonalTheme";
import PersonalInfo from "./Pages/ProfilePages/PersonalInfo";
import PersonalSecurity from "./Pages/ProfilePages/PersonalSecurity";
import PersonalNotifications from "./Pages/ProfilePages/PersonalNotifications";


import LoadingScreenAnimation from "./Pages/LoadingScreenAnimation/LoadingScreenAnimation";
/* -------------------------- Toast --------------------------- */

import { Toaster } from "react-hot-toast";
/* -------------------------- Theme --------------------------- */
import { buildMuiTheme } from "./Themes/Theme";
import useTheme from "./Store/useTheme";
import { Box, ThemeProvider } from "@mui/material";


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
      <div className="m-20">
        <Routes>
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bestproduct" element={<BestProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productdetails" element={<ProductDetailsPage />} />
          <Route path="/Profile" element={<Profile />}>
            <Route index element={<PersonalInfo />} />
            <Route path="Info" element={<PersonalInfo />} />
            <Route path="Security" element={<PersonalSecurity />} />
            <Route path="Themes" element={<PersonalTheme />} />
            <Route path="Notifications" element={<PersonalNotifications />} />
          </Route>
          <Route path="/questions" element={<Questions />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    </ThemeProvider>
  );
}

export default App;
