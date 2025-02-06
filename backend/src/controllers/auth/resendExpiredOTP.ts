import { Request, Response } from "express";
import User from "../../models/User";
import generateOTP from "../../helpers/generateOTP";
import sendOTPEmail from "../../services/sendOTPEmail";

const resendExpiredOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email is required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    if (user.isVerified) {
      return res
        .status(400)
        .json({ msg: "User has been already verified. Please go to LOGIN" });
    }

    // resending process

    const { otp, otpExpireTime } = generateOTP();
    user.otp = otp;
    user.otpExpireTime = otpExpireTime;
    await user.save();
    await sendOTPEmail(email, otp, user.username);

    return res.status(200).json({
      userID: user._id,
      message: "A new OTP has been sent to your email.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default resendExpiredOTP;
