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
/* --------------------------- "react-hook-form" -------------------------------- */
import { useForm } from "react-hook-form";
import { useUserMutations } from "../../Hooks/reactUser/useUserMutations";
import ViewButtonLoader from "../../Components/Loades/ViewButtonLoader";
import toast from "react-hot-toast";

function PersonalSecurity() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Validation happens on change
  });

  // Watch password to compare with confirmPassword
  const password = watch("password");

  const { changePassMutation } = useUserMutations();
  const onSubmit = (data) => {
    console.log("Updated security data:", data);
    // Excepected error because fields
    changePassMutation.mutate(
      { password: data.password },
      {
        onSuccess: () => {
          reset();
          console.log("Successfull changing password:");
          toast.success(`User changed password successfully`);
        },
        onError: (error) => {
          const serverMessage =
          error?.response?.data?.message || "Something went wrong";

        toast.error(serverMessage);
          toast.error(`User doessn't changed password `);
        },
      }
    );
  };

  const handleCancel = () => {
    reset();
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";

    const requirements = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };

    if (!requirements.length)
      return "Password must be at least 8 characters long";
    if (!requirements.uppercase)
      return "Password must contain at least one uppercase letter";
    if (!requirements.lowercase)
      return "Password must contain at least one lowercase letter";
    if (!requirements.number)
      return "Password must contain at least one number";
    if (!requirements.specialChar)
      return "Password must contain at least one special character";

    return true;
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return true;
  };

  // Check if form can be submitted
  const canSubmit = isDirty && isValid;

  return (
    <>
      {changePassMutation.isPending && <ViewButtonLoader />}
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
            <form
              id="security-form"
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              {/* New Password */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-white"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full rounded-md border px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6 ${
                      errors.password
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("password", {
                      required: "New password is required",
                      validate: validatePassword,
                    })}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-white"
                >
                  Confirm New Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className={`block w-full rounded-md border px-3 py-1.5 text-base outline-none placeholder:text-gray-500 focus:border-gray-500 sm:text-sm/6 ${
                      errors.confirmPassword
                        ? "border-red-500 bg-white text-gray-900"
                        : "border-gray-300 bg-white text-gray-900"
                    }`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: validateConfirmPassword,
                    })}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Password Requirements */}
              <div className="sm:col-span-6">
                <div className="bg-gray-50 rounded-md p-4">
                  <h4 className="text-sm font-medium mb-2">
                    Password Requirements
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li
                      className={
                        password?.length >= 8
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    >
                      • At least 8 characters long{" "}
                      {password?.length >= 8 && "✓"}
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(password)
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    >
                      • Contains uppercase letters{" "}
                      {/[A-Z]/.test(password) && "✓"}
                    </li>
                    <li
                      className={
                        /[a-z]/.test(password)
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    >
                      • Contains lowercase letters{" "}
                      {/[a-z]/.test(password) && "✓"}
                    </li>
                    <li
                      className={
                        /[0-9]/.test(password)
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    >
                      • Contains at least one number{" "}
                      {/[0-9]/.test(password) && "✓"}
                    </li>
                    <li
                      className={
                        /[!@#$%^&*(),.?":{}|<>]/.test(password)
                          ? "text-green-600"
                          : "text-gray-600"
                      }
                    >
                      • Contains special character{" "}
                      {/[!@#$%^&*(),.?":{}|<>]/.test(password) && "✓"}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="sm:col-span-6 mt-8">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    type="button"
                    sx={{
                      color: "white",
                      borderColor: "gray.500",
                      "&:hover": {
                        borderColor: "gray.300",
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!canSubmit}
                    sx={{
                      backgroundColor: canSubmit ? "#1976d2" : "gray.600",
                      "&:hover": {
                        backgroundColor: canSubmit ? "#1565c0" : "gray.600",
                      },
                      "&:disabled": {
                        backgroundColor: "gray.600",
                        color: "gray.400",
                      },
                    }}
                  >
                    Update Password
                  </Button>
                </Box>

                {/* Form Status Indicator */}
                {!canSubmit && isDirty && (
                  <Typography
                    variant="caption"
                    className="text-yellow-500 block mt-2 text-right"
                  >
                    Please fix validation errors to update password
                  </Typography>
                )}
              </div>
            </form>
          </div>
        </Box>
      </Grid>
    </>
  );
}

export default PersonalSecurity;
