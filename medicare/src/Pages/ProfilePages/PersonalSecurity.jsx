import React, { useState } from "react";
/* --------------------------- "Icons" -------------------------------- */
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
/* --------------------------- "MUI" -------------------------------- */

import {
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Button,
} from "@mui/material";

function PersonalSecurity() {
  const [showOTPSection, setShowOTPSection] = useState(false);
  return (
    <>
      <Grid size={{ xs: 12, md: 9 }}>
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4" className="text-white font-semibold">
            Security Settings
          </Typography>
          <Typography variant="body2" className="text-gray-400 mt-1">
            Manage your password and two-factor authentication settings.
          </Typography>
        </Box>

        <Box>
          <div className="border-b border-gray-300 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="current-password"
                  className="block text-sm/6 font-medium"
                >
                  Current Password
                </label>
                <div className="mt-2">
                  <input
                    id="current-password"
                    name="current-password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="new-password"
                  className="block text-sm/6 font-medium"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm/6 font-medium"
                >
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">
                    Password Requirements
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains uppercase and lowercase letters</li>
                    <li>
                      • Includes at least one number and special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sm:col-span-6 mt-8">
                <h3 className="text-lg font-medium mb-4">
                  Two-Factor Authentication
                </h3>

                {/* OTP Enable/Disable */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <h4 className="text-sm font-medium">
                      Enable OTP Verification
                    </h4>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setShowOTPSection(!showOTPSection)}
                  >
                    {showOTPSection ? "Cancel" : "Enable"}
                  </Button>
                </div>

                {showOTPSection && (
                  <div className="mt-6 space-y-6 p-4 bg-gray-50 rounded-md">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="otp-method"
                        className="block text-sm/6 font-medium"
                      >
                        OTP Delivery Method
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="otp-method"
                          name="otp-method"
                          defaultValue="email"
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 py-1.5 pr-8 pl-3 text-base outline-none focus:border-gray-500 sm:text-sm/6"
                        >
                          <option value="email">Email</option>
                          <option value="sms">SMS</option>
                          <option value="authenticator">
                            Authenticator App
                          </option>
                        </select>
                        <KeyboardArrowDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="otp-code"
                        className="block text-sm/6 font-medium"
                      >
                        Enter OTP Code
                      </label>
                      <div className="mt-2">
                        <input
                          id="otp-code"
                          name="otp-code"
                          type="text"
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                        />
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <Button variant="outlined" size="small">
                          Verify OTP
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          className="text-blue-600"
                        >
                          Resend Code
                        </Button>
                        <span className="text-sm text-gray-500">60s</span>
                      </div>
                    </div>

                    <div className="sm:col-span-6 p-3 bg-yellow-50 rounded-md border border-yellow-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">
                            Didn't receive the code?
                          </h4>
                          <p className="text-sm text-yellow-700">
                            Check your spam folder or try another method
                          </p>
                        </div>
                        <Button
                          variant="outlined"
                          size="small"
                          className="border-yellow-400 text-yellow-700"
                        >
                          Try Again
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          <Button variant="outlined">Cancel</Button>
          <Button variant="contained">Update Password</Button>
        </Box>
      </Grid>
    </>
  );
}

export default PersonalSecurity;
