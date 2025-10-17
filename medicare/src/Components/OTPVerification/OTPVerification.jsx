import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [state, setState] = useState({
    timeLeft: 300, // 5 minutes
    canResend: false,
    otp: "",
    isSubmitting: false,
    verified: false,
  });
  const navigate = useNavigate();

  const { timeLeft, canResend, otp, isSubmitting, verified } = state;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(
        () => setState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 })),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setState((prev) => ({ ...prev, canResend: true }));
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const onSubmit = () => {
    setState((prev) => ({ ...prev, isSubmitting: true }));

    setTimeout(() => {
      setState((prev) => ({ ...prev, verified: true, isSubmitting: false }));
    }, 600);
  };

  const handleResendOTP = () => {
    setState((prev) => ({ ...prev, timeLeft: 300, canResend: false }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-gray-600 mt-1">
            We've sent a 6-digit code to your email
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP Code
            </label>
            <input
              type="text"
              placeholder="123456"
              maxLength="6"
              value={otp}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  otp: e.target.value
                    .split("")
                    .filter((digit) => digit >= "0" && digit <= "9")
                    .join(""),
                }))
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">
              {timeLeft > 0 ? (
                <>
                  Time remaining:{" "}
                  <span className="text-gray-900 font-mono">
                    {formatTime(timeLeft)}
                  </span>
                </>
              ) : (
                <span className="text-red-500">OTP expired</span>
              )}
            </p>
          </div>

          {!verified ? (
            <button
              type="submit"
              disabled={isSubmitting || timeLeft === 0}
              className={`w-full px-4 py-2 rounded-lg font-medium text-white transition ${
                isSubmitting || timeLeft === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-main hover:bg-main-hover focus:outline-none focus:ring-2 focus:ring-main"
              }`}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-green-600 font-medium">
                OTP verified
              </p>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/reset-password")}
                  className="inline-block px-4 py-2 bg-main text-white rounded-lg"
                >
                  Continue to Reset Password
                </button>
              </div>
            </div>
          )}

          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-sm text-main hover:text-main-hover hover:underline font-medium"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Didn't receive the code? You can resend in{" "}
                {formatTime(timeLeft)}
              </p>
            )}
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            <Link
              to="/forgot-password"
              className="text-main hover:text-main-hover hover:underline font-medium"
            >
              ← Back to email entry
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
