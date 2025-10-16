import React, { useState } from "react";
/* --------------------------- "Icons" -------------------------------- */
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SecurityIcon from "@mui/icons-material/Security";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";
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
          {/* I wil be such as array of messages and loop of theme form the data base */}
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircleOutlineIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">
                    Order Successful
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your order #ORD-12345 has been confirmed and is being
                    processed.
                  </p>
                  <p className="text-xs text-green-600 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <SecurityIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-800">
                    New Sign In
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    New sign-in detected from Chrome on Windows.
                  </p>
                  <p className="text-xs text-blue-600 mt-1">5 hours ago</p>
                </div>
              </div>
            
            </div>
          </div>

          <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AccountCircleIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-purple-800">
                    Account Updated
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Your profile information has been successfully updated.
                  </p>
                  <p className="text-xs text-purple-600 mt-1">1 day ago</p>
                </div>
              </div>
             
            </div>
          </div>

          <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <LogoutIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">
                    Logged Out
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    You have been logged out from your mobile device.
                  </p>
                  <p className="text-xs text-gray-600 mt-1">2 days ago</p>
                </div>
              </div>
             
            </div>
          </div>

          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <LocalShippingIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">
                    Delivery Successful
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Your order #ORD-12345 has been delivered successfully.
                  </p>
                  <p className="text-xs text-green-600 mt-1">3 days ago</p>
                </div>
              </div>
             
            </div>
          </div>

          <div className="border border-red-200 bg-red-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CancelIcon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-800">
                    Order Canceled
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    Your order #ORD-12346 has been canceled as requested.
                  </p>
                  <p className="text-xs text-red-600 mt-1">1 week ago</p>
                </div>
              </div>
            
            </div>
          </div>

          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CreditCardIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">
                    Payment Successful
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Payment of $149.99 for order #ORD-12345 was successful.
                  </p>
                  <p className="text-xs text-green-600 mt-1">1 week ago</p>
                </div>
              </div>
             
            </div>
          </div>

          <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <WarningAmberIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">
                    Low Stock Alert
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Product "Wireless Headphones" is running low on stock.
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">2 weeks ago</p>
                </div>
              </div>
             
            </div>
          </div>
        </Box>
      </Grid>
    </>
  );
}

export default PersonalNotifications;
