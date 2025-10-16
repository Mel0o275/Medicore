import React, { useEffect, useState, forwardRef } from "react";
/* -------------------------- Icons --------------------------- */
import CloseIcon from "@mui/icons-material/Close";

/* -------------------------- MUI --------------------------- */
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { products } from "../../Constants/NavPages.jsx";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ViewButton from "../Buttons/ViewButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function SearchDialog({ open, onClose }) {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input != "") {
      const filtered = products.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      setData(filtered);
    }
  }, [input, products]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {},
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              py: 2,
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              sx={{
                backgroundColor: "#f5f5f5",
                "&:hover": { backgroundColor: "#e0e0e0" },
                transition: "0.3s",
              }}
            >
              <CloseIcon sx={{ color: "#6c63ff" }} />
            </IconButton>

            <Box
              sx={{
                flex: 1,
                maxWidth: 600,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1,
                borderRadius: "20px",
                backgroundColor: "white",
                boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                transition: "0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(108,99,255,0.3)",
                },
              }}
            >
              <SearchIcon sx={{ color: "#6c63ff", fontSize: 26 }} />
              <TextField
                variant="standard"
                placeholder="Search for products..."
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "1rem",
                    color: "text.primary",
                  },
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>
        <Box className="px-6 py-10">
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: "center",
            }}
          >
            {data.map((ele) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={ele.id}
                className="group relative cursor-pointer"
              >
                {/*Link */}
                <Box className="block overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={ele.images[0]}
                      alt={ele.title}
                      className="w-full rounded-2xl transition-opacity duration-500 group-hover:opacity-0"
                    />
                    <img
                      src={ele.images[1]}
                      alt={`${ele.title} hover`}
                      className="w-full absolute top-0 left-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div
                      className="absolute top-4 right-[-60px] flex flex-col gap-2 opacity-0 
          group-hover:opacity-100 group-hover:right-4 transition-all duration-500 ease-out"
                    >
                      <IconButton
                        color="primary"
                        className="bg-white shadow-md hover:bg-gray-100"
                        onClick={() =>
                          toast.success(`Added ${ele.title} to Cart 🛒`)
                        }
                      >
                        <AddShoppingCartIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        className="bg-white shadow-md hover:bg-gray-100"
                        onClick={() =>
                          toast.success(`Added ${ele.title} to Wishlist ❤️`)
                        }
                      >
                        <FavoriteBorderIcon />
                      </IconButton>
                      <ViewButton item={ele} />
                    </div>
                  </div>
                </Box>

                <Box mt={3} textAlign="center">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                    sx={{ fontSize: "1.125rem" }}
                  >
                    {ele.price}
                  </Typography>

                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="text.secondary"
                    noWrap
                    sx={{ maxWidth: "100%" }}
                  >
                    {ele.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
