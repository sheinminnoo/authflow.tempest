import crypto from "crypto";
const generateOTP = () => {
  const otp = crypto.randomBytes(3).toString("hex").slice(0, 6);
  const otpExpireTime = new Date(Date.now() + 5 * 60 * 1000);
  return { otp, otpExpireTime };
};

export default generateOTP;
