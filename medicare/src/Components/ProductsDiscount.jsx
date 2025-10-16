/* -------------------------- MUI --------------------------- */
import { Grid, Typography, Box } from "@mui/material";
/* -------------------------- Icons --------------------------- */

import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
/* -------------------------- Toast --------------------------- */

import toast from "react-hot-toast";

/* -------------------------- Constants --------------------------- */

import { products } from "../Constants/NavPages.jsx";
import ViewButton from "./Buttons/ViewButton";

export default function ProductsDiscount() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: Math.ceil(products.length / 4) }).map((_, i) => (
        <Grid size={{ xs: 12, sm: i == 2 ? 12 : 6, md: 4 }} key={i}>
          {products.slice(i * 4, i * 4 + 4).map((item, index) => (
            <Grid
              container
              key={index}
              className="bg-white md:h-[160px]  rounded-xl shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer mb-3"
            >
              {/* Image container */}
              <Grid size={6}>
                <div className="relative group">
                  <img
                    src={item.images[0]}
                    className="w-full h-40 object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <img
                    src={item.images[1]}
                    className="w-full h-40 object-cover absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Floating buttons */}
                  <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
                    <IconButton
                      color="primary"
                      className="bg-white shadow-md hover:bg-gray-100"
                      onClick={() => {
                        toast.success(`Added ${item.title} to Cart 🛒`);
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
                  <Typography
                    variant="p"
                    className="text-lg font-bold  mt-1"
                  >
                    {item.price}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}
