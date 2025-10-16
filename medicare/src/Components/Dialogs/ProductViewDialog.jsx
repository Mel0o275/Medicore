/* -------------------------- React --------------------------- */
import React, { useState, useEffect, forwardRef } from "react";
/* -------------------------- Icons --------------------------- */

import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
/* -------------------------- MUI --------------------------- */
import { Box, Grid, Rating , Divider , Slide , Typography  , Toolbar , AppBar , Dialog , IconButton } from "@mui/material";
/* -------------------------- Components --------------------------- */
import ProductImagesSwipper from "../Swiper/ProductImagesSwipper";
import AddCartButton from '../Buttons/AddCartButton';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
function ProductViewDialog({item , open ,handleClose }) {
    const [count, setCount] = useState(0);
  
 
  
  return (
    <>
       <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              {item.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 8, px: { xs: 2, md: 4 } }}>
          <Grid container spacing={4} alignItems="flex-start">
            {/* ----------- Images Section ----------- */}
            <Grid size={{ sm: 12, md: 4 }}>
              <ProductImagesSwipper itemImages={item.images} />
            </Grid>

            {/* ----------- Details Section ----------- */}
            <Grid size={{ sm: 12, md: 8 }}>
              <Typography variant="h4" fontWeight="600" gutterBottom>
                {item.title}
              </Typography>

              <Box display="flex" alignItems="center" mb={1}>
                <Rating value={item.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1, color: "gray" }}>
                  (1 reviewer)
                </Typography>
              </Box>

              <Typography variant="h5" color="primary" fontWeight="bold" mb={2}>
                {item.price}
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={3}>
                {item.desc}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              {/* ----------- Quantity + Add to Cart ----------- */}
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    p: 1,
                    width: "fit-content",
                  }}
                >
                  <IconButton
                    onClick={() => setCount((c) => Math.max(1, c - 1))}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    variant="body1"
                    sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}
                  >
                    {count}
                  </Typography>
                  <IconButton
                    onClick={() => setCount((c) => c + 1)}
                    size="small"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                <AddCartButton itemName={item.title} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </>
  )
}

export default ProductViewDialog
