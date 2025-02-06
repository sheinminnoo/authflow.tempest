import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import generateToken from "../../helpers/generateToken";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist." });
    }

    const validatePasswords = await bcrypt.compare(password, user.password);
    if (!validatePasswords) {
      return res.status(400).json({ msg: "Incorrect Passwords" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        msg: "Email not verified. Please verify your email to proceed.",
        redirectToVerifyPage: true,
      });
    }
    const token = generateToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "authFlow",
    });
    return res.status(200).json({
      status: "success",
      msg: "Login successful",
      userID: user._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export default login;
