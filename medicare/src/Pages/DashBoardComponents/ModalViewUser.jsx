import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../../Hooks/reactUser/useUserSelected";
import ViewButtonLoader from "../../Components/Loades/ViewButtonLoader";
import { useTheme } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  width: "90%", // phones
  maxWidth: "480px", // tablets

  maxHeight: "90vh",
  overflowY: "auto",
};

const BackdropStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(4px)",
};

export default function ViewUser({ open, handleClose, userId }) {
  const { data: user, isLoading, isError } = useUser(userId);

  const theme = useTheme();

  const getRoleColor = (role) => {
    const colors = {
      admin: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
      user: "linear-gradient(45deg, #4ECDC4, #44A08D)",
      moderator: "linear-gradient(45deg, #45B7D1, #96C93D)",
      default: "linear-gradient(45deg, #667eea, #764ba2)",
    };
    return colors[role?.toLowerCase()] || colors.default;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        style: { backgroundColor: `${theme.primaryColor}` },
      }}
      sx={{
        backdropFilter: "blur(4px)",
      }}
    >
      <Box sx={style}>
        {/* Header with Gradient Background */}
        <Box
          sx={{
            background: user
              ? getRoleColor(user.role)
              : "linear-gradient(45deg, #667eea, #764ba2)",
            p: 3,
            position: "relative",
            color: "white",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              />
              <Box>
                <Typography variant="h6" fontWeight="600">
                  Loading...
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: { xs: "column", sm: "row" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              <Avatar
                src={user?.profilePic || ""}
                alt={user?.firstName}
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              />
              <Box>
                <Typography variant="h5" fontWeight="700" sx={{ mb: 0.5 }}>
                  {user?.firstName} {user?.secondName}
                </Typography>
                <Typography
                  sx={{
                    opacity: 0.9,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  {user?.role?.toUpperCase() || "USER"}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {isLoading ? (
            <ViewButtonLoader />
          ) : isError ? (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                color: "error.main",
              }}
            >
              <Typography variant="h6" color="error" sx={{ mb: 1 }}>
                Failed to load user info
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please try again later
              </Typography>
            </Box>
          ) : (
            <>
              {/* Info Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },

                  gap: 3,
                  width: "100%",
                  textAlign: "left",
                }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      mt: 0.5,
                    }}
                  >
                    {user?.email || "N/A"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      mt: 0.5,
                    }}
                  >
                    {user?.phoneNumber || "N/A"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Gender
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      mt: 0.5,
                      color:
                        user?.gender?.toLowerCase() === "male"
                          ? "primary.main"
                          : "secondary.main",
                    }}
                  >
                    {user?.gender || "N/A"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontWeight: 600,
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Date of Birth
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      mt: 0.5,
                    }}
                  >
                    {formatDate(user?.dateOfBirth)}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ width: "100%", my: 3 }} />

              {/* Footer */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Member since
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "primary.main",
                  }}
                >
                  {formatDate(user?.createdAt)}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
