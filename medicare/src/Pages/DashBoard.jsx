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
/*------------------------------------ Icons --------------------------------------- */

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

import { Outlet } from "react-router-dom";
import useSearchStore from "../Store/useSearchStore";

/*------------------------------------ React router --------------------------------------- */

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
  const [open, setOpen] = useState(false);
  const setQuery = useSearchStore((state) => state.setQuery);

  const handleDrawerToggle = () => {
    setOpen(!open);
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
        {/* <DrawerHeader /> */}

        <Outlet />
      </Main>
    </Box>
  );
};

export default Dashboard;
