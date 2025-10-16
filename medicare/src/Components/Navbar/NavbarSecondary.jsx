import React, { useState , useEffect } from "react";

/* -------------------------- Icons --------------------------- */
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MedicationIcon from "@mui/icons-material/Medication";

/* -------------------------- MUI --------------------------- */
import { Box, AppBar, Toolbar, Typography, InputBase } from "@mui/material";

/* -------------------------- Material/Styles --------------------------- */

import { styled, alpha } from "@mui/material/styles";
import SearchDialog from "../Dialogs/SearchDialog";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavbarSecondary() {
  const [search, setSearch] = useState(false);
 
  
  const handleSearchClick = () => {
    setSearch(true);
  };
  return (
    <Box sx={{ flexGrow: 1, overflowX: "hidden" }}>
      <SearchDialog
        open={search}
        onClose={() => {
        
          setSearch(false);
        }}
      />
      <AppBar position="static" sx={{ color: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* <img
          src="/images/logo.png"
          alt="logo"
          className="w-20 sm:w-12 md:w-12 lg:w-12 h-auto"
        /> */}
            <MedicationIcon />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Medicore
            </Typography>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onClick={handleSearchClick}
            />
          </Search>

          <Box
            sx={{
              display: "flex",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalPhoneIcon />
            <Box>
              <p>Sales and services support</p>
              <p>
                <b>+20-123-456-789</b>
              </p>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
