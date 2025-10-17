import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaAt } from "react-icons/fa";

const SignInForm = () => {
  const [user, setUser] = useState({
    showPassword: false,
    email: "",
    password: "",
    isSubmitting: false,
  });

  const { showPassword, email, password, isSubmitting } = user;

  const onSubmit = () => {
    setUser((prev) => ({ ...prev, isSubmitting: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200`}
                value={email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaAt className="h-5 w-5" />
              </span>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a297] focus:border-[#00a297] transition-all duration-200`}
                value={password}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                onClick={() =>
                  setUser((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </span>
            </div>
          </div>

          {/* Remember & Forgot (responsive) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-main bg-white border-gray-300 rounded focus:ring-2 focus:ring-main"
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
