import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
  Paper,
  alpha,
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

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// Menu items data with routes
const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon />,
    key: "dashboard",
    path: "/DashBoard",
  },
  {
    text: "Inventory Management",
    icon: <InventoryIcon />,
    key: "inventory",
    path: "/DashBoard/Inventory",
  },
  {
    text: "Orders and Purchases",
    icon: <OrdersIcon />,
    key: "orders",
    path: "/DashBoard/Orders",
  },
  {
    text: "Employees",
    icon: <PeopleIcon />,
    key: "employees",
    path: "/DashBoard/Employees",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    key: "settings",
    path: "/DashBoard/Settings",
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Check if menu item is active
  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path === "/DashBoard" && location.pathname === "/DashBoard")
    );
  };

  // Admin slider content
  const AdminSlider = () => (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Avatar
        sx={{
          width: 80,
          height: 80,
          margin: "0 auto 16px",
          border: `3px solid ${theme.palette.primary.main}`,
        }}
        src="/static/images/avatar/1.jpg"
        alt="Admin Avatar"
      >
        A
      </Avatar>
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        John Doe
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Administrator
      </Typography>
    </Box>
  );

  // Drawer content
  const drawer = (
    <div>
      <AdminSlider />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleMenuClick(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                },
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path) ? "white" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* App Bar */}
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

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
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
        {drawer}
      </Drawer>

      {/* Main Content with Router Outlet */}
      <Main open={open}>
        <DrawerHeader />
        {/* This is where the nested routes will render */}
        <Outlet />
      </Main>
    </Box>
  );
};

export default Dashboard;
