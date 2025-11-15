import React from "react";
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
/* --------------------------- "MUI" -------------------------------- */

import {
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";

function PersonalNotifications() {
  // This would eventually come from your database/state
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Order Successful",
      message: "Your order #ORD-12345 has been confirmed and is being processed.",
      time: "2 hours ago",
      icon: CheckCircleOutlineIcon,
      color: "green"
    },
    {
      id: 2,
      type: "info",
      title: "New Sign In",
      message: "New sign-in detected from Chrome on Windows.",
      time: "5 hours ago",
      icon: SecurityIcon,
      color: "blue"
    },
    {
      id: 3,
      type: "info",
      title: "Account Updated",
      message: "Your profile information has been successfully updated.",
      time: "1 day ago",
      icon: AccountCircleIcon,
      color: "purple"
    },
    {
      id: 4,
      type: "info",
      title: "Logged Out",
      message: "You have been logged out from your mobile device.",
      time: "2 days ago",
      icon: LogoutIcon,
      color: "gray"
    },
    {
      id: 5,
      type: "success",
      title: "Delivery Successful",
      message: "Your order #ORD-12345 has been delivered successfully.",
      time: "3 days ago",
      icon: LocalShippingIcon,
      color: "green"
    },
    {
      id: 6,
      type: "error",
      title: "Order Canceled",
      message: "Your order #ORD-12346 has been canceled as requested.",
      time: "1 week ago",
      icon: CancelIcon,
      color: "red"
    },
    {
      id: 7,
      type: "success",
      title: "Payment Successful",
      message: "Payment of $149.99 for order #ORD-12345 was successful.",
      time: "1 week ago",
      icon: CreditCardIcon,
      color: "green"
    },
    {
      id: 8,
      type: "warning",
      title: "Low Stock Alert",
      message: 'Product "Wireless Headphones" is running low on stock.',
      time: "2 weeks ago",
      icon: WarningAmberIcon,
      color: "yellow"
    }
  ];

  // Placeholder functions for future functionality
  const handleClearAll = () => {
    console.log("Clear all notifications clicked");
    // Add your clear all functionality here later
  };

  const handleDeleteNotification = (id) => {
    console.log(`Delete notification with id: ${id}`);
    // Add your delete functionality here later
  };

  return (
    <>
      <Grid size={{ xs: 12, md: 9 }}>
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4" className="text-white font-semibold">
            Notifications
          </Typography>
          <Typography variant="body2" className="text-gray-400 mt-1">
            Your recent notifications and alerts.
          </Typography>
        </Box>

        {/* Clear All Button */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
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
                color: "white"
              }
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
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            const colorClasses = {
              green: "border-green-200 bg-green-50",
              blue: "border-blue-200 bg-blue-50",
              purple: "border-purple-200 bg-purple-50",
              gray: "border-gray-200 bg-gray-50",
              red: "border-red-200 bg-red-50",
              yellow: "border-yellow-200 bg-yellow-50"
            };
            const textClasses = {
              green: "text-green-800",
              blue: "text-blue-800",
              purple: "text-purple-800",
              gray: "text-gray-800",
              red: "text-red-800",
              yellow: "text-yellow-800"
            };
            const iconBgClasses = {
              green: "bg-green-100 text-green-600",
              blue: "bg-blue-100 text-blue-600",
              purple: "bg-purple-100 text-purple-600",
              gray: "bg-gray-100 text-gray-600",
              red: "bg-red-100 text-red-600",
              yellow: "bg-yellow-100 text-yellow-600"
            };

            return (
              <div 
                key={notification.id} 
                className={`border rounded-lg p-4 ${colorClasses[notification.color]}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconBgClasses[notification.color]}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${textClasses[notification.color]}`}>
                        {notification.title}
                      </h4>
                      <p className={`text-sm mt-1 ${
                        notification.color === 'green' ? 'text-green-700' :
                        notification.color === 'blue' ? 'text-blue-700' :
                        notification.color === 'purple' ? 'text-purple-700' :
                        notification.color === 'gray' ? 'text-gray-700' :
                        notification.color === 'red' ? 'text-red-700' :
                        'text-yellow-700'
                      }`}>
                        {notification.message}
                      </p>
                      <p className={`text-xs mt-1 ${
                        notification.color === 'green' ? 'text-green-600' :
                        notification.color === 'blue' ? 'text-blue-600' :
                        notification.color === 'purple' ? 'text-purple-600' :
                        notification.color === 'gray' ? 'text-gray-600' :
                        notification.color === 'red' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  
                  {/* Delete Button for individual notification */}
                  <IconButton
                    onClick={() => handleDeleteNotification(notification.id)}
                    sx={{
                      ml: 1,
                      color: '#6b7280',
                      '&:hover': {
                        backgroundColor: '#ef4444',
                        color: 'white'
                      }
                    }}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            );
          })}
        </Box>
      </Grid>
    </>
  );
}

export default PersonalNotifications;