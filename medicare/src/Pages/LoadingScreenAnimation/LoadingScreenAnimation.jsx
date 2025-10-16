import { Cardio } from "ldrs/react";
import "ldrs/react/Cardio.css";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";

export default function LoadingScreenAnimation({ isVisible, onFinish }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onFinish();
      }, 0);
      document.body.style.overflow = "hidden";

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, [isVisible, onFinish]);

  const theme = useTheme();

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              scaleX: 0,
              opacity: 0,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              color: "white",
            }}
          >
            <Cardio size="50" stroke="4" speed="2" color="black" />
            <Typography variant="h6" mt={2}>
              Loading...
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
