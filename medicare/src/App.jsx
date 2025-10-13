import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import BestProducts from "./Pages/BestProducts/BestProducts";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Delivery from "./Pages/Delivery/Delivery";
import Feedback from "./Pages/Feedback/Feedback";
import Login from "./Pages/Login/Login";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Profile from "./Pages/Profile/Profile";
import Questions from "./Pages/Questions/Questions";
import Shop from "./Pages/Shop/Shop";
import Signup from "./Pages/Signup/Signup";
import WishList from "./Pages/WishList/WishList";
import Navbar from "./Components/Navbar/NAvbar";
import Footer from "./Components/Footer/Footer";


function App() {
  return (
    <>
      <Navbar />
        <div className="m-20">
        <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bestproduct" element={<BestProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </Router>
        </div>
    <Footer />
    </>
  );
}

export default App;
