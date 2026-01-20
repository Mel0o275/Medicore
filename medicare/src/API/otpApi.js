import clientOTP from "./otpClient";

// Get one user
export const sendOTP = async () => {
  const res = await clientOTP.post("/send-otp");
  return res?.data?.message;
};

// Get all users
export const verifyOTP = async (otp) => {
  const res = await clientOTP.post("/verify-otp" , {otp});
  return res?.data?.message;
};


