import { useMutation } from "@tanstack/react-query";
import { verifyOTP, sendOTP } from "../../API/otpApi";

export const useOTPMutaions = () => {
  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTP,
  });

  const sendOTPMutation = useMutation({
    mutationFn: sendOTP,
  });

  return {
    verifyOTPMutation,
    sendOTPMutation,
  };
};
