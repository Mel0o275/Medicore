import React, { useState } from "react";

/* --------------------------- "MUI" -------------------------------- */

import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
 
} from "@mui/material";

/* --------------------------- "Icons" -------------------------------- */

/* --------------------------- "Constants" -------------------------------- */


/* --------------------------- "pages" -------------------------------- */
import Logout from "../Logout/Logout.jsx";



import { profileList } from "../../Constants/NavPages.jsx";
import { Outlet, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ minHeight: "100vh", p: 2 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Logout */}
          {open ? (
            <Logout open={open} handleClose={handleClose}></Logout>
          ) : (
            <></>
          )}
          <Grid size={12}>
            <Typography variant="h3">Account settings</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow:
                  "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
              }}
            >
              <List
                sx={{
                  p: 0,
                  display: { xs: "flex", md: "block" },
                  flexDirection: { xs: "row", md: "column" },
                  flexWrap: { xs: "wrap", md: "nowrap" },
                }}
              >
                {profileList.map((item, i) => (
                  <ListItem
                    disablePadding
                    key={i}
                    sx={{
                      borderBottom: {
                        md:
                          i < profileList.length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                      },
                      borderRight: {
                        xs:
                          i < profileList.length - 1
                            ? "1px solid #f3f4f6"
                            : "none",
                        md: "none",
                      },
                      flex: { xs: "1 1 50%", sm: "1 1 33%", md: "none" },
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                      },
                      transition: "background-color 0.2s ease-in-out",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        py: { xs: 1.5, md: 2 },
                        px: { xs: 1, md: 3 },
                        justifyContent: { xs: "center", md: "flex-start" },
                      }}
                      onClick={() => {
                        if (item.name != "Logout") navigate(item.name);
                        else {
                          handleOpen();
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: { xs: 0, md: 40 },
                          color: "#6b7280",
                          display: { xs: "none", sm: "none", md: "flex" },
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.name}
                        sx={{
                          textAlign: { xs: "center", md: "left" },
                          "& .MuiListItemText-primary": {
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            fontWeight: 500,
                            color: "#374151",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          <Outlet />
        </Grid>
      </Container>
    </Box>
  );
}

export default Profile;
