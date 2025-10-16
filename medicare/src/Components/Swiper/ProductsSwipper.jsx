import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// ================================ Constants ========================================

import { products } from "../../Constants/NavPages.jsx";

// ================================ MUI ========================================
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";
import { Button, Typography } from "@mui/material";
// ================================ Componnets ========================================
import ViewButton from "../Buttons/ViewButton";

export default function ProductsSwipper() {
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
                src={item.images[0]}
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              <img
                src={item.images[1]}
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
                  onClick={() =>
                    toast.success(`Added ${item.title} to Cart 🛒`)
                  }
                >
                  <AddShoppingCartIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  className="bg-white shadow-md hover:bg-gray-100"
                  onClick={() =>
                    toast.success(`Added ${item.title} to Wishlist ❤️`)
                  }
                >
                  <FavoriteBorderIcon />
                </IconButton>
                <ViewButton item={item} />
              </div>

              {/* Add to cart from bottom */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => toast.success(`Added ${item.title} to Cart 🛒`)}
                sx={{
                  position: "absolute",
                  bottom: "-50px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0,
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "9999px",
                  px: 3,
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
              <Typography variant="p" className="text-gray-500 text-sm flex-1">
                {item.desc}
              </Typography>
              <Typography variant="p" className="text-xl font-bold mt-2">
                {item.price}
              </Typography>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
