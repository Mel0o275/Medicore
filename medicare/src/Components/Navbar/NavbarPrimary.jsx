import * as React from "react";

/* -------------------------- React --------------------------- */

import { useState, useEffect } from "react";
/* -------------------------- MUI --------------------------- */

import {
  IconButton,
  Badge,
  Grid,
  useScrollTrigger,
  Slide,
  Container,
  Toolbar,
  Box,
  AppBar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
/* -------------------------- Props --------------------------- */

import PropTypes from "prop-types";
/* -------------------------- Icons --------------------------- */
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MedicationIcon from "@mui/icons-material/Medication";
import DrawerNav from "./DrawerNav";

/* -------------------------- Constant --------------------------- */
import {
  categories,
  elementsItems,
  navItems,
} from "../../Constants/NavPages.jsx";
/* -------------------------- React-router-dom --------------------------- */

import { Link } from "react-router-dom";
import useAuthStore from "../../Store/useAuthStore.js";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
export default function Navbar(props) {
  const slugs = categories.map((c) =>
    c.title.toLowerCase().trim().replace(/\s+/g, "-")
  );
  const [categoriesAnchor, setCategoriesAnchor] = useState(null);
  const [elementsAnchor, setElementsAnchor] = useState(null);

  const handleCategoriesClick = (event) => {
    setCategoriesAnchor(event.currentTarget);
  };

  const handleElementsClick = (event) => {
    setElementsAnchor(event.currentTarget);
  };

  const handleCategoriesClose = () => {
    setCategoriesAnchor(null);
  };

  const handleElementsClose = () => {
    setElementsAnchor(null);
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const user = useAuthStore((state) => state.user);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar sx={{ position: "sticky" }}>
        <Grid
          container
          spacing={2}
          sx={{ width: "100%", alignItems: "center" }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            className="p-3"
            size={{ xs: 6, md: 10 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navItems.map((ele, i) => (
                <Grid item xs={ele === "All Categories" ? 4 : 2} key={i}>
                  {ele === "All Categories" ? (
                    <Box>
                      <Button
                        onClick={handleCategoriesClick}
                        startIcon={<MenuIcon />}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{ color: "black", fontWeight: "600" }}
                      >
                        {ele}
                      </Button>

                      <Menu
                        anchorEl={categoriesAnchor}
                        open={Boolean(categoriesAnchor)}
                        onClose={handleCategoriesClose}
                      >
                        {categories.map((category, i) => (
                          <MenuItem
                            key={category.title}
                            onClick={handleCategoriesClose}
                          >
                            <Button
                              sx={{ color: "black", fontWeight: "600" }}
                              component={Link}
                              to={`/shop?categories=${slugs[i]}`}
                            >
                              {category.title}
                            </Button>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : ele === "Elements" ? (
                    <Box>
                      <Button
                        onClick={handleElementsClick}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{ color: "black", fontWeight: "600" }}
                      >
                        {ele}
                      </Button>

                      <Menu
                        anchorEl={elementsAnchor}
                        open={Boolean(elementsAnchor)}
                        onClose={handleElementsClose}
                      >
                        {elementsItems.map((item) => (
                          <MenuItem key={item} onClick={handleElementsClose}>
                            <Button
                              sx={{ color: "black", fontWeight: "600" }}
                              component={Link}
                              to={`/${item}`}
                            >
                              {item}
                            </Button>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    <Button
                      sx={{ color: "black", fontWeight: "600" }}
                      component={Link}
                      to={`/${ele}`}
                    >
                      {ele}
                    </Button>
                  )}
                </Grid>
              ))}
            </Box>

            <Box
              sx={{
                display: { sm: "flex", md: "none" },
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                flexWrap: "nowrap",
              }}
            >
              <DrawerNav
                open={openDrawer}
                toggleDrawer={() => setOpenDrawer(false)}
              />
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,

                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                  fontSize: { xs: ".86rem" },
                }}
              >
                Medicore
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 6, md: 2 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                component={Link}
                to="/wishlist"
              >
                <Badge badgeContent={4} color="error">
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={17} color="error">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>

              {user ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                  component={Link}
                  to="/Profile"
                >
                  <PersonIcon />
                </IconButton>
              ) : (
                <Button
                  sx={{ color: "black", fontWeight: "600" }}
                  component={Link}
                  to="/login"
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </AppBar>
    </HideOnScroll>
  );
}
