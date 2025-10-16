import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";
/* -------------------------- MUI --------------------------- */
import { Dialog, Box, Typography, useTheme } from "@mui/material";
/* -------------------------- React --------------------------- */
import React, { useEffect } from "react";

export default function ViewButtonLoader() {
  const theme = useTheme();


  return (
    <Dialog
      fullScreen
      open={true}
      PaperProps={{
        sx: {
          position: "fixed",
          inset: 0,
          backdropFilter: "blur(6px)", 
          backgroundColor: "rgba(255, 255, 255, 0.6)", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "none",
          boxShadow: "none",
        },
      }}
    >
      <TailChase size="70" speed="1.5" color={theme.palette.primary.main} />

      
    </Dialog>
  );
}
