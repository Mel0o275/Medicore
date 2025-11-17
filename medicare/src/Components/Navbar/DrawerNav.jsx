import * as React from "react";
/* -------------------------- MUI --------------------------- */

import {
  Grid,
  Box,
  Drawer,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Button,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

/* -------------------------- Icons --------------------------- */
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MedicationIcon from "@mui/icons-material/Medication";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* -------------------------- Constant --------------------------- */

import {
  categories,
  elementsItems,
  navItems,
} from "../../Constants/NavPages.jsx";
/* -------------------------- React-router --------------------------- */

import { Link } from "react-router-dom";

export default function DrawerNav({ open, toggleDrawer }) {
  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation">
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "grey.200" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "primary.main" }}
        >
          Menu
        </Typography>
      </Box>

      <Box sx={{ py: 1 }}>
        {navItems.map((ele, i) => (
          <Box
            key={i}
            sx={{
              borderBottom: i < navItems.length - 1 ? 1 : 0,
              borderColor: "grey.100",
            }}
          >
            {ele === "All Categories" ? (
              <Accordion
                sx={{
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { margin: 0 },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    px: 2,
                    minHeight: 48,
                    "&.Mui-expanded": { minHeight: 48 },
                    "& .MuiAccordionSummary-content": { my: 1 },
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
                    {ele}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0, bgcolor: "grey.50" }}>
                  {categories.map((category, index) => (
                    <Button
                      key={index}
                      component={Link}
                      to={`/category?category=${category.title}`}
                      onClick={toggleDrawer}
                      sx={{
                        color: "text.primary",
                        fontWeight: 400,
                        width: "100%",
                        justifyContent: "flex-start",
                        px: 3,
                        py: 1.5,
                        fontSize: "0.85rem",
                        borderBottom: index < categories.length - 1 ? 1 : 0,
                        borderColor: "grey.200",
                        borderRadius: 0,
                        "&:hover": {
                          bgcolor: "grey.100",
                        },
                      }}
                    >
                      {category.title}
                    </Button>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : ele === "Elements" ? (
              <Accordion
                sx={{
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { margin: 0 },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={{
                    px: 2,
                    minHeight: 48,
                    "&.Mui-expanded": { minHeight: 48 },
                    "& .MuiAccordionSummary-content": { my: 1 },
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "0.9rem" }}>
                    {ele}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0, bgcolor: "grey.50" }}>
                  {elementsItems.map((item, index) => (
                    <Button
                      key={index}
                      component={Link}
                      to={`/${item}`}
                      onClick={toggleDrawer}
                      sx={{
                        color: "text.primary",
                        fontWeight: 400,
                        width: "100%",
                        justifyContent: "flex-start",
                        px: 3,
                        py: 1.5,
                        fontSize: "0.85rem",
                        borderBottom: index < elementsItems.length - 1 ? 1 : 0,
                        borderColor: "grey.200",
                        borderRadius: 0,
                        "&:hover": {
                          bgcolor: "grey.100",
                        },
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : (
              <Button
                component={Link}
                to={`/${ele}`}
                onClick={toggleDrawer}
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  width: "100%",
                  justifyContent: "flex-start",
                  px: 2,
                  py: 2,
                  fontSize: "0.9rem",
                  borderRadius: 0,
                  "&:hover": {
                    bgcolor: "grey.50",
                  },
                }}
              >
                {ele}
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}
