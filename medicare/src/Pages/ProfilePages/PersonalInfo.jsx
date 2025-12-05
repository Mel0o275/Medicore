import React, { useEffect, useState } from "react";
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
/* --------------------------- "Function Controller" -------------------------------- */
import { useHandleImageUpload } from "../../FunctionControler/ImageUpload";
/* --------------------------- "react-hook-form" -------------------------------- */

import { useForm } from "react-hook-form";
/* --------------------------- "React query User" -------------------------------- */

import { useUserMutations } from "../../Hooks/reactUser/useUserMutations";

/* --------------------------- "Zustand" -------------------------------- */

/* --------------------------- "Components" -------------------------------- */

import ViewButtonLoader from "../../Components/Loades/ViewButtonLoader";
import toast from "react-hot-toast";
import { useUser } from "../../Hooks/reactUser/useUserSelected";

import useAuthStore from "../../Store/useAuthStore";

function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuthStore();

  // From rahma
  const userId = user?.data?.id;
  const token = user?.data?.token || localStorage.getItem("token");

  const { handleImageUpload } = useHandleImageUpload();

  // React query

  const { updateDataMutation, uploadAvatarMutation } = useUserMutations();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const { data: userDate } = useUser(userId, {
    enabled: !!userId,
  });

  const [changeData, setChangeData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  const [selectedImg, setSelectedImg] = useState(null);
  useEffect(() => {
    if (userDate) {
      setChangeData({
        firstName: userDate.firstName || "",
        secondName: userDate.secondName || "",
        email: userDate.email || "",
        phoneNumber: userDate.phoneNumber || "",
        dateOfBirth: formatDate(userDate.dateOfBirth),
        gender: userDate.gender || "",
      });

      reset({
        firstName: userDate.firstName,
        secondName: userDate.secondName,
        email: userDate.email,
        phoneNumber: userDate.phoneNumber,
        dateOfBirth: formatDate(userDate.dateOfBirth),
        gender: userDate.gender,
      });
    }
  }, [userDate]);

  console.log(userDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log("user id : " + userId);

  function onSubmit(data) {
    console.log("Moka");
    console.log("Updated data:", data);

    updateDataMutation.mutate(data, {
      onSuccess: () => {
        setIsEditing(false);
        toast.success(`User Updated data successfully`);
      },
      onError: (error) => {
        const serverMessage =
          error?.response?.data?.message || "User doesn't Updated data";

        toast.error(serverMessage);
      },
    });
  }

  const handleCancelEdit = () => {
    if (!userDate) {
      console.log("Hassan");
      return;
    }

    reset({
      firstName: userDate.firstName,
      secondName: userDate.secondName,
      email: userDate.email,
      phoneNumber: userDate.phoneNumber,
      dateOfBirth: userDate.dateOfBirth,
      gender: userDate.gender,
    });

    setIsEditing(false);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleCancelEdit();
    } else {
      setIsEditing(true);
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const d = new Date(isoDate);
    return d.toISOString().split("T")[0];
  };

  return (
    <>
      {uploadAvatarMutation.isPending && <ViewButtonLoader />}
      {updateDataMutation.isPending && <ViewButtonLoader />}

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
            {/* Take the pic from rahma */}
            <Avatar
              alt="Profile avatar"
              src={selectedImg || userDate?.profilePic || "/static/images/avatar/1.jpg"}
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
              onChange={(e) => handleImageUpload(e, setSelectedImg)}
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
              onClick={handleEditToggle}
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { xs: "auto", sm: 140 },
              }}
            >
              {isEditing ? "Cancel" : "Change your info"}
            </Button>
            {isEditing && (
              <Button
                type="submit"
                // onClick={handleUpdateData}
                form="personal-info-form"
                variant="contained"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { xs: "auto", sm: 140 },
                  backgroundColor: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#45a049",
                  },
                }}
              >
                Update data
              </Button>
            )}
          </Box>
        </Box>

        <Box>
          <div className="border-b border-gray-300 pb-12">
            <form
              id="personal-info-form"
              onSubmit={handleSubmit((data) => {
                console.log(data);
                onSubmit(data);
              })}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-white"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setChangeData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                    }}
                    id="first-name"
                    type="text"
                    autoComplete="given-name"
                    disabled={!isEditing}
                    className={`block w-full rounded-md border px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6 ${
                      !isEditing
                        ? "bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500"
                        : errors.firstName
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="second-name"
                  className="block text-sm/6 font-medium text-white"
                >
                  Second name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setChangeData((prev) => ({
                        ...prev,
                        secondName: e.target.value,
                      }));
                    }}
                    id="last-name"
                    type="text"
                    autoComplete="family-name"
                    disabled={!isEditing}
                    className={`block w-full rounded-md border px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6 ${
                      !isEditing
                        ? "bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500"
                        : errors.secondName
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("secondName", {
                      required: "Second name is required",
                      minLength: {
                        value: 2,
                        message: "Second name must be at least 2 characters",
                      },
                    })}
                  />
                  {errors.secondName && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.secondName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setChangeData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                    id="email"
                    type="email"
                    autoComplete="email"
                    disabled={!isEditing}
                    className={`block w-full rounded-md border px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6 ${
                      !isEditing
                        ? "bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500"
                        : errors.email
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm/6 font-medium text-white"
                >
                  phoneNumber number
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setChangeData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }));
                    }}
                    id="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    disabled={!isEditing}
                    className={`block w-full rounded-md border px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6 ${
                      !isEditing
                        ? "bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500"
                        : errors.phoneNumber
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("phoneNumber", {
                      required: "phoneNumber number is required",
                      pattern: {
                        value: /^\+?[0-9]{10,15}$/,
                        message: "Invalid phoneNumber number",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm/6 font-medium text-white"
                >
                  Date of birth
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setChangeData((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }));
                    }}
                    id="dateOfBirth"
                    type="date"
                    disabled={!isEditing}
                    className={`block w-full rounded-md border px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6 ${
                      !isEditing
                        ? "bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500"
                        : errors.dateOfBirth
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                      validate: {
                        validDate: (value) => {
                          const date = new Date(value);
                          return !isNaN(date.getTime()) || "Invalid date";
                        },
                        pastDate: (value) => {
                          const date = new Date(value);
                          return (
                            date < new Date() || "Date must be in the past"
                          );
                        },
                      },
                    })}
                  />
                  {errors.dateOfBirth && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="gender"
                  className="block text-sm/6 font-medium text-white"
                >
                  Gender
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="gender"
                    disabled={!isEditing}
                    className={`col-start-1 row-start-1 w-full appearance-none rounded-md border py-1.5 pr-8 pl-3 text-base outline-none focus:border-gray-500 sm:text-sm/6 ${
                      !isEditing
                        ? "bg-gray-100 cursor-not-allowed border-gray-300 text-gray-500"
                        : errors.gender
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("gender", { required: "Gender is required" })}
                    onChange={(e) => {
                      setChangeData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }));
                    }}
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
                  {errors.gender && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.gender.message}
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Box>
      </Grid>
    </>
  );
}

export default PersonalInfo;
