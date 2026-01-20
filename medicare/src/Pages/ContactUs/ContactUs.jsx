import React from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import image1 from "../../../public/Jolie/place_map.PNG";
import useTheme from "../../Store/useTheme";

const ContactUs = () => {
  const theme = useTheme();

  const ContactCardMUI = ({ IconComponent, title, content }) => (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          minWidth: 50,
          height: 50,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mr: 2,
        }}
      >
        <IconComponent
          sx={{
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
            fontSize: 24,
          }}
        />
      </Box>

      <Stack>
        {title && (
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              color:
                theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
            }}
          >
            {title}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
          }}
        >
          {content}
        </Typography>
      </Stack>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box
        sx={{
          textAlign: "center",
          mb: 5,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          sx={{
            color:
              theme.mode !== "dark" ? theme.primaryText : theme.primaryColor,
          }}
        >
          Contact Us
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 400,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 2,
            }}
          >
            <img
              src={image1}
              alt="Map Location"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="medium"
              sx={{
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              Get In Touch With Us
            </Typography>
            <Typography
              sx={{
                mb: 2,
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              If you wish to directly reach us, please fill out the form below.
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Your name"
                variant="outlined"
                sx={{
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                }}
              />
              <TextField
                fullWidth
                label="Your email"
                variant="outlined"
                type="email"
                sx={{
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                }}
              />
              <TextField
                fullWidth
                label="Your message (optional)"
                multiline
                rows={5}
                variant="outlined"
                sx={{
                  backgroundColor:
                    theme.mode !== "dark"
                      ? theme.primaryColor
                      : theme.secondaryText,
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                }}
              />

              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.secondaryColor,
                  color:
                    theme.mode !== "dark"
                      ? theme.primaryText
                      : theme.primaryColor,
                  "&:hover": {
                    backgroundColor:
                      theme.mode !== "dark"
                        ? theme.primaryColor
                        : theme.secondaryText,
                  },
                  alignSelf: "flex-start",
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ContactCardMUI
            IconComponent={LocationOnIcon}
            content="50-UTC, Beside Orange Hospital"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ContactCardMUI
            IconComponent={PhoneIcon}
            title="Call us :"
            content="+00 123-456-789"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ContactCardMUI
            IconComponent={MailIcon}
            title="Mail us :"
            content="demo@example.com"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ContactCardMUI
            IconComponent={AccessTimeIcon}
            title="Open time :"
            content="10:00 AM - 6:00 PM"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
