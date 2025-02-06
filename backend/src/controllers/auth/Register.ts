import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import generateOTP from "../../helpers/generateOTP";
import sendOTPEmail from "../../services/sendOTPEmail";
const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (username.length < 4 || username.length > 20) {
      return res
        .status(400)
        .json({ msg: "Username must be between 3 to 20 characters" });
    }

    const passwordValidation =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!password.match(passwordValidation)) {
      return res.status(400).json({
        msg: "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const hashValue = await bcrypt.hash(password, 12);
    const { otp, otpExpireTime } = generateOTP();
    await sendOTPEmail(email, otp, username);
    const user = await User.create({
      username,
      email,
      password: hashValue,
      otp,
      otpExpireTime,
      isVerified: false, // default value is false
    });
    return res.status(201).json({
      userID: user._id,
      msg: "User registered successfully. Please verify your email.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default register;
