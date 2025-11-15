/*-------------------------- MUI --------------------------- */
import {
  Box,

  Typography,
  Button,

} from "@mui/material";

/* -------------------------- Motion --------------------------- */

import { motion, AnimatePresence } from "framer-motion";


export default  function MotionDiv({ img, mainText, secondText, buttonText, duration }) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={img} 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration }}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Box
            component="img"
            src={img}
            alt={mainText}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
              display: "block",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              p: 3,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))",
              borderRadius: 2,
              color: "white",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                fontWeight: 500,
                opacity: 0.85,
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                  md: "1.1rem",
                  lg: "1.2rem",
                },
              }}
            >
              {secondText}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                mb: 2,
                fontWeight: "bold",
                lineHeight: 1.2,
                textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: "1.75rem",
                },
              }}
            >
              {mainText}
            </Typography>

            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              {buttonText}
            </Button>
          </Box>
        </motion.div>
      </AnimatePresence>
    );
  }
