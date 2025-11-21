/* -------------------------- MUI --------------------------- */
import { Grid, Typography, Box } from "@mui/material";
/* -------------------------- Icons --------------------------- */

import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
/* -------------------------- Toast --------------------------- */

import toast from "react-hot-toast";

/* -------------------------- Constants --------------------------- */

// import { products } from "../Constants/NavPages.jsx";
import ViewButton from "./Buttons/ViewButton";

import { useProductStore } from "../Store/useProductStore";


// ================================ Mai  ========================================

import { useContext } from "react";
import { CartContext } from "../Context/cartContext.jsx";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";


export default function ProductsDiscount() {
  const { products } = useProductStore();
  console.log(products);

  const limitedProducts = products.slice(0, 12);

  console.log(limitedProducts);


    const navigate = useNavigate();
    const { count, setCount } = useContext(CartContext);
  
    const API = import.meta.env.VITE_API_URL;
    // console.log(API);
    const token = localStorage.getItem("token");
  
    // ======================== Add To Cart Function ========================
    async function addToCart(item) {
      if (!token?.trim()) {
        navigate("/login");
        return;
      }
  
      console.log(item._id);
  
      try {
        const { data } = await axios.post(
          `${API}/cart`,
          { _id: item._id },
          {
            headers: {
              Authorization: token,
            },
          }
        );
  
        toast.success(`Added ${item.title} to Cart 🛒`);
        setCount(count + 1);
      } catch (err) {
        console.log(err);
        toast.error(`Failed to add ${item.title} to cart`);
      }
    }

  return (
    <Grid container spacing={2}>
      {Array.from({ length: Math.ceil(limitedProducts.length / 4) }).map(
        (_, i) => (
          <Grid size={{ xs: 12, sm: i == 2 ? 12 : 6, md: 4 }} key={i}>
            {limitedProducts.slice(i * 4, i * 4 + 4).map((item, index) => (
              <Grid
                container
                key={index}
                className="bg-white md:h-[160px]  rounded-xl shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer mb-3"
              >
                {/* Image container */}
                <Grid size={6}>
                  <div className="relative group">
                    <img
                      src={item.images[0].url}
                      className="w-full h-40 object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <img
                      src={item.images[1].url}
                      className="w-full h-40 object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Floating buttons */}
                    <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
                      <IconButton
                        color="primary"
                        className="bg-white shadow-md hover:bg-gray-100"
                        onClick={() => {
                    addToCart(item);
                  }}
                      >
                        <AddShoppingCartIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="primary"
                        className="bg-white shadow-md hover:bg-gray-100"
                        onClick={() => {
                          toast.success(`Added ${item.title} to Wishlist ❤️`);
                        }}
                      >
                        <FavoriteBorderIcon fontSize="small" />
                      </IconButton>
                      <ViewButton item={item} />
                    </div>
                  </div>
                </Grid>

                {/* Product info */}
                <Grid size={6}>
                  <div className="p-3 text-center flex flex-col justify-between flex-1">
                    <Typography
                      variant="body1"
                      className="text-base font-semibold"
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="p" className="text-gray-500 text-xs">
                      {item.desc}
                    </Typography>
                    <Typography variant="p" className="text-lg font-bold  mt-1">
                      {item.price}$
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )
      )}
    </Grid>
  );
}
