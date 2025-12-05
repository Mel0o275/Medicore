import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// ================================ Constants ========================================

// import { products } from "../../Constants/NavPages.jsx";

// ================================ MUI ========================================
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";
import { Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
// ================================ Componnets ========================================
import ViewButton from "../Buttons/ViewButton";
// ================================ Mai  ========================================
import { useContext } from "react";
import { CartContext } from "../../Context/cartContext.jsx";

import { WishContext } from "../../Context/wishContext.jsx";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export default function ProductsSwipper() {
  const { likedItems, toggleLike } = useContext(WishContext);

  function handleLike(_id) {
    const token = localStorage.getItem("token");
    if (!token?.trim()) {
      navigate("/login");
      return;
    }

    const currentlyLiked = likedItems.includes(_id);
    toggleLike(_id);

    const action = currentlyLiked ? "removed from" : "added to";
    toast(`Product ${action} wishlist ✨`, {
      position: "top-center",
      duration: 2000,
    });
  }

  const navigate = useNavigate();
  const { count, setCount } = useContext(CartContext);

  const API = import.meta.env.VITE_API_URL;
  // console.log(API);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const { data } = await axios.get(`${API}/products`);
    return data;
  };
  const {
    data: productsdata,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: true,
  });
  const products = productsdata?.data?.products || [];

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
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      freeMode={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
    >
      {products.map((item) => (
        <SwiperSlide key={item.id} className="product-item pb-10">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl cursor-pointer h-[410px] flex flex-col justify-between">
            {/* Image container */}
            <div className="relative group h-64 overflow-hidden">
              <img
                src={item.images[0].url}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src={item.images[1].url}
                className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Floating right buttons */}
              <div
                className="absolute top-4 right-[-60px] flex flex-col gap-2 opacity-0 
          group-hover:opacity-100 group-hover:right-4 transition-all duration-500 ease-out"
              >
                <IconButton
                  color="primary"
                  className="bg-white shadow-md hover:bg-gray-100"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleLike(item._id)}
                  sx={{
                    backgroundColor: likedItems.includes(item._id)
                      ? "#00a297"
                      : "",
                    color: likedItems.includes(item._id) ? "#fff" : "",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                    "&:hover": {
                      backgroundColor: likedItems.includes(item._id)
                        ? "#008c82"
                        : "",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.25s ease-in-out",
                  }}
                >
                  {likedItems.includes(item._id) ? (
                    <FavoriteIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderIcon fontSize="small" />
                  )}
                </IconButton>

                <ViewButton item={item} />
              </div>

              {/* Add to cart from bottom */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  addToCart(item);
                }}
                sx={{
                  position: "absolute",
                  bottom: "-50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  px: 2,
                  py: 1,
                  fontSize: "0.875rem",
                  boxShadow: 3,
                  transition: "all 0.5s ease-out",

                  ".group:hover &": {
                    bottom: 16,
                    opacity: 1,
                  },
                }}
              >
                Add to Cart
              </Button>
            </div>

            {/* Product info */}
            <div className="p-4 text-center flex flex-col justify-between flex-1">
              <Typography variant="body1" className="text-lg font-semibold">
                {item.title}
              </Typography>
              {/* <Typography variant="p" className="text-gray-500 text-sm flex-1">
                {item.desc}
              </Typography> */}
              <Typography variant="p" className="text-xl font-bold mt-2">
                {item.price}$
              </Typography>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
