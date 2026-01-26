import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../../Store/useTheme";
import { useOTPMutaions } from "../../Hooks/OTP/useOTPMutaion";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonalSecurity from "./PersonalSecurity";

const OTP_TIME = 180;

const MotionBox = motion(Box);

export default function OTPPersonalSecurity() {
  const { verifyOTPMutation, sendOTPMutation } = useOTPMutaions();
  const [step, setStep] = React.useState(0);
  const [otp, setOtp] = React.useState("");
  const [showOTP, setShowOTP] = React.useState(false);

  const [timer, setTimer] = React.useState(OTP_TIME);
  const [success, setSuccess] = React.useState(false);

  const theme = useTheme();

  /* TIMER */
  React.useEffect(() => {
    if (step !== 1) return;

    if (timer === 0) {
      setStep(0);
      setTimer(OTP_TIME);
      setOtp("");
      return;
    }

    const i = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(i);
  }, [step, timer]);

  const formatTime = (s) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <Grid
      size={{ xs: 12, md: 9 }}
      sx={{
        borderRadius: 4,
        p: 4,
        backdropFilter: "blur(10px)",
      }}
    >
      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {step === 0 && (
          <MotionBox
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={1}
              sx={{
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              Secure Your Account 🔐
            </Typography>

            <Typography
              mb={3}
              sx={{
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              We’ll send a one-time password (OTP) to your registered email
              address to verify your identity.
            </Typography>

            <Typography
              variant="body2"
              mb={2}
              sx={{
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              • The OTP is valid for <strong>180 seconds</strong>.<br />
              • Do not share this code with anyone.
              <br />• If you don’t receive the email, please check your spam
              folder.
            </Typography>

            <br />

            <Box>
              <Button
                size="large"
                onClick={() => {
                  sendOTPMutation.mutate(undefined, {
                    onSuccess: (response) => {
                      toast.success(response || "OTP send successfully");
                      setStep(1);
                      setTimer(OTP_TIME);
                    },
                    onError: (error) => {
                      const serverMessage =
                        error?.response?.data?.message || "OTP faild to send";

                      toast.error(serverMessage);
                    },
                  });
                }}
                sx={{
                  px: 4,
                  fontWeight: "bold",
                  borderRadius: 3,
                  background: theme.primaryColor,
                  color:
                  
                       theme.primaryText,
                     
                  ":hover": { opacity: 0.9 },
                }}
              >
                Send OTP
              </Button>
            </Box>
          </MotionBox>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <MotionBox
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Verify OTP
            </Typography>

            <Typography color="text.secondary" mb={2}>
              Enter the 6-digit code sent to your email
            </Typography>

            <TextField
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type={showOTP ? "text" : "password"}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowOTP(!showOTP)}
                      edge="end"
                      size="small"
                    >
                      {showOTP ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              textAlign="center"
              mb={2}
              color="error"
              fontWeight="bold"
            >
              {formatTime(timer)}
            </Typography>

            <Button
              fullWidth
              size="large"
              onClick={() => {
                verifyOTPMutation.mutate(otp, {
                  onSuccess: (response) => {
                    toast.success(response || "OTP verified");
                    setStep(2);
                  },
                  onError: (error) => {
                    const serverMessage =
                      error?.response?.data?.message ||
                      "OTP is wrong ! try again";

                    toast.error(serverMessage);
                  },
                });
              }}
              sx={{
                py: 1.3,
                borderRadius: 3,
                background: `linear-gradient(90deg,${theme.primaryColor},${theme.primaryText})`,
                color:
                  theme.mode !== "dark"
                    ? theme.primaryText
                    : theme.primaryColor,
              }}
            >
              Verify
            </Button>
          </MotionBox>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <MotionBox
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <PersonalSecurity
              setSuccess={() => {
                setSuccess(true);
                setStep(3);
                setTimeout(() => {
                  setSuccess(false);
                  setStep(0);
                }, 2000);
              }}
            />
          </MotionBox>
        )}

        {/* SUCCESS */}
        {success && (
          <MotionBox
            key="success"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            textAlign="center"
          >
            <CheckCircleIcon sx={{ fontSize: 70, color: "green", mb: 1 }} />
            <Typography fontWeight="bold">Password Updated 🎉</Typography>
          </MotionBox>
        )}
      </AnimatePresence>
    </Grid>
  );
}
