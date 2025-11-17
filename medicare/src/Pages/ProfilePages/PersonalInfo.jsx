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

function PersonalInfo() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { handleImageUpload } = useHandleImageUpload();

  // React query

  const { updateDataMutation, uploadAvatarMutation } = useUserMutations();

  const {
    data: userDate,
    isLoading,
    isError,
  } = useUser(localStorage.getItem("id"));
  
  // console.log(userDate);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    defaultValues: {
    

      firstName: userDate?.firstName ?? "John",
      secondName: userDate?.secondName ?? "Doe",
      email: userDate?.email ?? "john.doe@example.com",
      phoneNumber: userDate?.phoneNumber ?? "000000000000",
      dateOfBirth: userDate?.dateOfBirth ?? "1990-01-01",
      gender: userDate?.gender ?? "male",
    },
  });

  
  const onSubmit = (data) => {
    console.log("Updated data:", data);

   
    updateDataMutation.mutate(data, {
      onSuccess: () => {
        setIsEditing(false);
        toast.success(`User Updated data successfully`);
      },
      onError: (error) => {
        console.error("Error changing info:", error);
        const serverMessage =
          error?.response?.data?.message || "Something went wrong";

        toast.error(serverMessage);
      },
    });
  };

  const handleCancelEdit = () => {
   
    reset({
    

      firstName: userDate?.firstName ?? "John",
      secondName: userDate?.secondName ?? "Doe",
      email: userDate?.email ?? "john.doe@example.com",
      phoneNumber: userDate?.phoneNumber ?? "000000000000",
      dateOfBirth: userDate?.dateOfBirth ?? "1990-01-01",
      gender: userDate?.gender ?? "male",
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


  const handleUpdateData = async () => {
   
    const isValid = await trigger();

    if (isValid) {
      handleSubmit(onSubmit)();
    }
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
              sx={{
                width: { xs: "100%", sm: "auto" },
                minWidth: { xs: "auto", sm: 140 },
              }}
            >
              Delete the img
            </Button>
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
                type="button" // Change to button to prevent native form submission
                onClick={handleUpdateData} // Use our custom handler
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
              onSubmit={handleSubmit(onSubmit)}
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
