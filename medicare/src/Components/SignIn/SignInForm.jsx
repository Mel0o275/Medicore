import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaAt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signInSchema from "./SignInSchema.jsx";
import useAuthStore from "../../Store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const onSubmit = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/auth/login`,
        data: { email: data.email, password: data.password },
        credentials: "include",
      });

      if (res && (res.status === 200 || res.status === 201)) {
        const user = res.data.user || res.data;
        const token = res.data.token || res.data.jwt;

        // Persist to Zustand
        login(user, token);

        // Show success message then navigate
        toast.success("Signed in successfully. ");
        navigate("/Profile");
      } else {
        const respMsg = "Unable to sign in. Please try again.";
        toast.error(respMsg);
      }
    } catch (err) {
      console.log("Sign-in error:", err.message);
      toast.error("Incorrect email or password. Please try again");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border border-gray-300 focus:ring-main focus:border-main"
                }`}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaAt className="h-5 w-5" />
              </span>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border border-gray-300 focus:ring-[#00a297] focus:border-[#00a297]"
                }`}
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

          {/* Remember & Forgot (responsive) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                id="remember"
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 accent-main bg-white border-gray-300 rounded focus:ring-2 focus:ring-main"
              />
              <span className="ml-2">Remember me</span>
            </label>

            <div className="text-sm">
              <Link
                to="/forgotpassword"
                className="text-sm text-main hover:text-main-hover transition-colors underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          {/* Authentication error */}
          {authError && (
            <p className="mt-1 text-sm text-red-600 text-center">{authError}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-main hover:bg-main-hover focus:outline-none focus:ring-2 focus:ring-main shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>

          {/* Sign up link */}
          <div className="text-center text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-main hover:text-main-hover font-medium transition-colors underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
