import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

const ForgotPasswordForm = () => {
  const [form, setForm] = useState({
    email: "",
    isSubmitting: false,
    isSubmitted: false,
  });

  const { email, isSubmitting, isSubmitted } = form;

  const onSubmit = () => {
    setForm((prev) => ({ ...prev, isSubmitting: true, isSubmitted: true }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Check Your Email
            </h2>
            <p className="text-gray-600 mt-2">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-gray-900 font-medium mt-1">{email}</p>
            <p className="text-sm text-gray-500 mt-4">
              Redirecting to verification page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-gray-600 mt-1">
            Enter your email to reset your password
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaEnvelope className="h-5 w-5" />
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 rounded-lg font-medium text-white transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-main hover:bg-main-hover focus:outline-none focus:ring-2 focus:ring-main"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-main hover:text-main-hover underline font-medium"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
