/* --------------------------- MUI ---------------------------- */
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
} from "@mui/material";
/*------------------------------------ React router --------------------------------------- */

import { useNavigate, useLocation } from "react-router-dom";

/*------------------------------------ Icons --------------------------------------- */

import {
  Inventory as InventoryIcon,
  ShoppingCart as OrdersIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

import { AdminSlider } from "./DashBoardAdminSlider";

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
    text: "Users",
    icon: <PeopleIcon />,
    key: "users",
    path: "/DashBoard/Users",
  },
  // {
  //   text: "Settings",
  //   icon: <SettingsIcon />,
  //   key: "settings",
  //   path: "/DashBoard/Settings",
  // },
];

export function DashboardDrawer() {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path === "/DashBoard" && location.pathname === "/DashBoard")
    );
  };

  return (
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
}
