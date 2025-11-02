import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaAt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "./SignUpSchema.jsx";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  console.log("SignUpForm rendered");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      birthdate: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    // navigate to sign in and show an informational message
    navigate("/signin", {
      state: {
        message: `Account prepared for ${data.firstName} `,
        type: "info",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                {...register("firstName")}
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                {...register("lastName")}
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a297] focus:border-[#00a297] transition-all duration-200"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaAt className="h-5 w-5" />
              </span>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone  */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              {...register("phone")}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Gender and Birthdate  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    id="gender-male"
                    type="radio"
                    value="male"
                    {...register("gender")}
                    className="genderInputValidation h-4 w-4 accent-main focus:ring-main border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    id="gender-female"
                    type="radio"
                    value="female"
                    {...register("gender")}
                    className="genderInputValidation h-4 w-4 accent-main focus:ring-main border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth
              </label>
              <input
                id="birthdate"
                type="date"
                {...register("birthdate")}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
              />
              {errors.birthdate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.birthdate.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a297] focus:border-[#00a297] transition-all duration-200"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </span>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a297] focus:border-[#00a297] transition-all duration-200"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                onClick={() => setShowConfirmPassword((s) => !s)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-main hover:bg-main-hover focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 focus:ring-offset-gray-50 shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-main hover:text-main-hover font-medium transition-colors underline"
            >
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
