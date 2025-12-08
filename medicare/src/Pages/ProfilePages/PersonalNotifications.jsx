import React , {useState} from "react";
/* --------------------------- "Icons" -------------------------------- */
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SecurityIcon from "@mui/icons-material/Security";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";


/* --------------------------- "MUI" -------------------------------- */

import {
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Button,
  Pagination,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNoti } from "../../Hooks/reactNoti/useNoti";
import { useNotiMutations } from "../../Hooks/reactNoti/useNotiMutations";
import toast from "react-hot-toast";
import ViewButtonLoader from "../../Components/Loades/ViewButtonLoader";

function PersonalNotifications() {

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: notis, isLoading, isError, error } = useNoti(page, limit);

  const { clearNotiMutation, deleteNotiMutation } = useNotiMutations();

  const notifications = notis || [];

  // console.log(notifications);

  // const handleNextPage = () => {
  //   if (notifications.length === limit) {
  //     setPage((prev) => prev + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (page > 1) {
  //     setPage((prev) => prev - 1);
  //   }
  // };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return CheckCircleOutlineIcon;
      case "warning":
        return WarningAmberIcon;
      case "error":
        return CancelIcon;
      case "info":
      default:
        return SecurityIcon;
    }
  };

  // Function to get color based on notification type
  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "green";
      case "warning":
        return "yellow";
      case "error":
        return "red";
      case "info":
      default:
        return "blue";
    }
  };

  const formatTime = (createdAt) => {
    if (!createdAt) return "Unknown time";

    const created = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - created;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    if (diffInDays < 7)
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

    return created.toLocaleDateString();
  };

  const handleClearAll = () => {
    clearNotiMutation.mutate({
      onSuccess: () => {
        toast.success(`User clear notifictions successfully`);
      },
      onError: (error) => {
        // console.error("Error changing info:", error);
        const serverMessage =
          error?.response?.data?.message || "Something went wrong";

        toast.error(serverMessage);
      },
    });

    console.log("Clear all notifications clicked");
  }

  const handleDeleteNotification = (id) => {
    console.log(`Delete notification with id: ${id}`);
    deleteNotiMutation.mutate(id, {
      onSuccess: () => {
        toast.success(`User delete notifiction  successfully`);
      },
      onError: (error) => {
        // console.error("Error changing info:", error);
        const serverMessage =
          error?.response?.data?.message || "Something went wrong";

        toast.error(serverMessage);
      },
    });
  };

  

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <ViewButtonLoader />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Error loading notifications: {error?.message || "Unknown error"}
      </Alert>
    );
  }


  return (
    <>
      <Grid size={{ xs: 12, md: 9 }}>
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4" className="text-white font-semibold">
            Notifications
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ClearAllIcon />}
            onClick={handleClearAll}
            sx={{
              color: "#6b7280",
              borderColor: "#6b7280",
              "&:hover": {
                backgroundColor: "#374151",
                borderColor: "#9ca3af",
                color: "white",
              },
            }}
          >
            Clear All Notifications
          </Button>
        </Box>

      

        <Box
          className="space-y-4"
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            pr: 1.5,
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            p: 2,
            backgroundColor: "#f9fafb",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#9ca3af",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#6b7280",
            },
          }}
        >
{/* <<<<<<< HEAD */}
          {notifications.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" className="text-gray-500">
                No notifications found.
              </Typography>
            </Box>
          ) : (
            notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              const color = getNotificationColor(notification.type);

              const colorClasses = {
                green: "border-green-200 bg-green-50",
                blue: "border-blue-200 bg-blue-50",
                purple: "border-purple-200 bg-purple-50",
                gray: "border-gray-200 bg-gray-50",
                red: "border-red-200 bg-red-50",
                yellow: "border-yellow-200 bg-yellow-50",
              };
              const textClasses = {
                green: "text-green-800",
                blue: "text-blue-800",
                purple: "text-purple-800",
                gray: "text-gray-800",
                red: "text-red-800",
                yellow: "text-yellow-800",
              };
              const iconBgClasses = {
                green: "bg-green-100 text-green-600",
                blue: "bg-blue-100 text-blue-600",
                purple: "bg-purple-100 text-purple-600",
                gray: "bg-gray-100 text-gray-600",
                red: "bg-red-100 text-red-600",
                yellow: "bg-yellow-100 text-yellow-600",
              };

              return (
                <div
                  key={notification._id}
                  className={`border rounded-lg p-4 ${
                    colorClasses[color] || colorClasses.blue
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          iconBgClasses[color] || iconBgClasses.blue
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`text-sm font-medium ${
                            textClasses[color] || textClasses.blue
                          }`}
                        >
                          {notification.title || "New Notification"}
                        </h4>
                        <p
                          className={`text-sm mt-1 ${
                            color === "green"
                              ? "text-green-700"
                              : color === "blue"
                              ? "text-blue-700"
                              : color === "purple"
                              ? "text-purple-700"
                              : color === "gray"
                              ? "text-gray-700"
                              : color === "red"
                              ? "text-red-700"
                              : "text-yellow-700"
                          }`}
                        >
                          {notification.message || "No message content"}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            color === "green"
                              ? "text-green-600"
                              : color === "blue"
                              ? "text-blue-600"
                              : color === "purple"
                              ? "text-purple-600"
                              : color === "gray"
                              ? "text-gray-600"
                              : color === "red"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {formatTime(notification.createdAt)}
                          {notification.status === "unread" && (
                            <span className="ml-2 px-1 py-0.5 bg-red-500 text-white text-xs rounded">
                              New
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Delete Button for individual notification */}
                    <IconButton
                      onClick={() => handleDeleteNotification(notification._id)}
                      sx={{
                        ml: 1,
                        color: "#6b7280",
                        "&:hover": {
                          backgroundColor: "#ef4444",
                          color: "white",
                        },
                      }}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              );
            })
          )}

        </Box>

        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            p: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Page {page}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<ChevronLeft />}
              onClick={handlePreviousPage}
              disabled={page === 1}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Previous
            </Button>

            <Button
              variant="outlined"
              endIcon={<ChevronRight />}
              onClick={handleNextPage}
              disabled={notifications.length < limit} // Disable if fewer notifications than limit (no more pages)
              sx={{
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Next
            </Button>
          </Stack>
        </Box> */}
      </Grid>
    </>
  );
}


export default PersonalNotifications;