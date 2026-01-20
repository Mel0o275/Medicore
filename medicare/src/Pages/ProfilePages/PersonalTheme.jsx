import { Typography, Box, Grid, Container, Divider } from "@mui/material";
import React, { useEffect } from "react";
import Palette from "../../Components/ThemeComponents/Palette";
import { arrOfColors } from "../../Constants/Colors";
import useTheme from "../../Store/useTheme";

function PersonalTheme() {
  const [activeId, setActiveId] = React.useState(() => {
    const saved = localStorage.getItem("activeId");
    return saved !== null ? Number(saved) : null;
  });

  const {
    toggleColors,
    makeSaveMode,
    primaryColor,
    mode,
    secondaryText,
    primaryText,
  } = useTheme();

  useEffect(() => {
    if (activeId !== null) {
      localStorage.setItem("activeId", activeId.toString());
    }
  }, [activeId]);

  return (
    <Grid size={{ xs: 12, md: 9 }}>
      <Container>
        <Typography
          variant="h3"
          sx={{ color: mode !== "dark" ? primaryText : primaryColor }}
        >
          Themes
        </Typography>
        <Divider sx={{ width: "100%" }} />
        <br />
        <Typography
          variant="p"
          sx={{ color: mode !== "dark" ? primaryText : primaryColor }}
        >
          Choose the theme form our theme library{" "}
        </Typography>
        <br /> <br />
        <Grid container spacing={4}>
          {arrOfColors.map((item, i) => (
            <Grid
              key={i}
              size={{ md: 4, sm: 6 }}
              sx={{
                border: "1px solid",
                backgroundColor: mode !== "dark" ? primaryColor : secondaryText,
                borderRadius: "10px",
                p: 2,
                transition: "all 0.35s ease",
                cursor: "pointer",

                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Palette
                item={item}
                id={i}
                checked={activeId === i}
                onSelect={() => {
                  setActiveId(i);
                  toggleColors(
                    item.primaryColor,
                    item.secondaryColor,
                    item.primaryText,
                    item.secondaryText,
                  );
                  makeSaveMode(item.darkTheme);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}

export default PersonalTheme;
