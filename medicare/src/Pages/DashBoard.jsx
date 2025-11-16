import React, { useState } from "react";
/* --------------------------- MUI ---------------------------- */
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useSearchStore from "../Store/useSearchStore";

const drawerWidth = 280;

// Styled components (same as before)
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
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

/*------------------------------------ Icons --------------------------------------- */
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
/*------------------------------------ React router --------------------------------------- */

import { Outlet } from "react-router-dom";

/*------------------------------------ Dash Components --------------------------------------- */
import { DrawerHeader } from "./DashBoardComponents/DashBoardDrawerHeader";
import {
  Search,
  SearchIconWrapper,
  Main,
  StyledInputBase,
  drawerWidth,
} from "./DashBoardComponents/DashBoardSearch";
import { DashboardDrawer } from "./DashBoardComponents/DashBoardDrawer";

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const setQuery = useSearchStore((state) => state.setQuery);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

    
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 2,
            }}
          >
            <MenuIcon />
          </IconButton>

       
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

  
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader />
        <DashboardDrawer />
      </Drawer>

    
      <Main open={open}>
        <DrawerHeader />
      
        <Outlet />
      </Main>
    </Box>
  );
};

export default Dashboard;
