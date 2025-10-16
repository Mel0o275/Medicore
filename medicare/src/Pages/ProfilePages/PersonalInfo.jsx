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

function PersonalInfo() {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      //   await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <>
      <Grid size={{ xs: 12, md: 9 }}>
        <Box sx={{ pb: 2 }}>
          <Typography variant="h4" className="text-white font-semibold">
            Personal Information
          </Typography>
          <Typography variant="body2" className="text-gray-400 mt-1">
            Use a permanent address where you can receive mail.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              alt="Profile avatar"
              src={selectedImg || "/static/images/avatar/1.jpg"}
              sx={{
                width: 80,
                height: 80,
                border: "3px solid #e5e7eb",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: -8,
                  right: -8,
                  backgroundColor: "white",
                  color: "#1c1219",
                  border: "2px solid #e5e7eb",
                  width: 32,
                  height: 32,
                  "&:hover": {
                    backgroundColor: "#f3f4f6",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease-in-out",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CameraAltOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </label>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3, md: 4 },
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { xs: "auto", sm: 140 },
              }}
            >
              Delete the img
            </Button>
            <Button
              variant="contained"
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { xs: "auto", sm: 140 },
              }}
            >
              Change your info
            </Button>
          </Box>
        </Box>

        <Box>
          <div className="border-b border-gray-300 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    defaultValue="John"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    defaultValue="Doe"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue="john.doe@example.com"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium"
                >
                  Country
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    defaultValue="United States"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 py-1.5 pr-8 pl-3 text-base outline-none focus:border-gray-500 sm:text-sm/6"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  <KeyboardArrowDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="phone" className="block text-sm/6 font-medium">
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="birthdate"
                  className="block text-sm/6 font-medium"
                >
                  Date of birth
                </label>
                <div className="mt-2">
                  <input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    defaultValue="1990-01-01"
                    className="block w-full rounded-md border border-gray-300 px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="gender" className="block text-sm/6 font-medium">
                  Gender
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="gender"
                    name="gender"
                    defaultValue="male"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md border border-gray-300 py-1.5 pr-8 pl-3 text-base outline-none focus:border-gray-500 sm:text-sm/6"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <KeyboardArrowDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Grid>
    </>
  );
}

export default PersonalInfo;
