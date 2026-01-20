import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import Checkbox from "@mui/material/Checkbox";

export default function Palette({ item, id, checked, onSelect }) {

  const handleChange = (event) => {
    if (event.target.checked) {
      onSelect(); 
     
    }
  };
  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      <Grid size={10} sx={{ justifyContent: "center", alignItems: "center" }}>
        <Typography variant="p" sx={{ fontSize: "1.2rem" }}>
          {item.name}
        </Typography>
      </Grid>
      <Grid size={2}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          slotProps={{
            input: { "aria-label": "controlled" },
          }}
        />
      </Grid>
      <Grid size={12} container spacing={2} sx={{ justifyContent: "center" }}>
        {Object.values(item)
          .slice(1, 5)
          .map((value, index) => (
            <Grid size={3} key={index}>
              <Avatar sx={{ color: "transparent", bgcolor: value }}>M</Avatar>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
