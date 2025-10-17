import { useState } from "react";
import { FaEye, FaEyeSlash, FaAt } from "react-icons/fa";

const SignUpForm = () => {
  const [user, setUser] = useState({
    showPassword: false,
    showConfirmPassword: false,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    isSubmitting: false,
  });

  const {
    showPassword,
    showConfirmPassword,
    firstName,
    lastName,
    email,
    phone,
    gender,
    birthdate,
    password,
    confirmPassword,
    isSubmitting,
  } = user;

  const onSubmit = () => {
    setUser((prev) => ({ ...prev, isSubmitting: true }));
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

        <form onSubmit={onSubmit} className="space-y-5">
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
                name="firstName"
                value={firstName}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, firstName: e.target.value }))
                }
                type="text"
                placeholder="First name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
              />
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
                name="lastName"
                value={lastName}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, lastName: e.target.value }))
                }
                type="text"
                placeholder="Last name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
              />
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
                name="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a297] focus:border-[#00a297] transition-all duration-200"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaAt className="h-5 w-5" />
              </span>
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
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
            />
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
                    name="gender"
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    className="genderInputValidation h-4 w-4 accent-main focus:ring-main border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    id="gender-female"
                    name="gender"
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    className="genderInputValidation h-4 w-4 accent-main focus:ring-main border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">Female</span>
                </label>
              </div>
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
                name="birthdate"
                type="date"
                value={birthdate}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, birthdate: e.target.value }))
                }
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-main focus:border-main transition-all duration-200"
              />
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
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Create a strong password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a297] focus:border-[#00a297] transition-all duration-200"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00a297] focus:border-[#00a297] transition-all duration-200"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                onClick={() =>
                  setUser((prev) => ({
                    ...prev,
                    showConfirmPassword: !prev.showConfirmPassword,
                  }))
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </span>
            </div>
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
              href="/login"
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
