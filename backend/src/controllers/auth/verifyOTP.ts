import { Request, Response } from "express";
import User from "../../models/User";

const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ msg: "Email and OTP are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    if (otp !== user.otp) {
      return res.status(400).json({ msg: "Invalid OTP." });
    }

    if (user.otpExpireTime && user.otpExpireTime.getTime() < Date.now()) {
      return res.status(400).json({
        msg: "OTP has expired. Please request a new one.",
      });
    }

    user.otp = undefined;
    user.otpExpireTime = undefined;
    user.isVerified = true;

    // Save updated user data
    await user.save();

    return res
      .status(200)
      .json({ msg: "Email verified successfully.", userID: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: "Internal Server Error. Please try again later.",
    });
  }
};

export default verifyOTP;
