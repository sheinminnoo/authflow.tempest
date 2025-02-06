import express from "express";
import register from "../../controllers/auth/Register";
import login from "../../controllers/auth/Login";
import authValidator from "../../helpers/authValidator";
import { body } from "express-validator";
import verifyOTP from "../../controllers/auth/verifyOTP";
import resendExpiredOTP from "../../controllers/auth/resendExpiredOTP";
const authRouter = express.Router();

authRouter.post(
  "/register",
  body("email").notEmpty().isEmail().withMessage("Invalid Email Format"),
  body("username").notEmpty().withMessage("Username is required."),
  body("password").notEmpty().withMessage("Password is required."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confrim Password is required."),
  authValidator,
  register
);

authRouter.post(
  "/login",
  body("email").notEmpty().isEmail().withMessage("Invalid Email Format"),
  body("password").notEmpty().withMessage("Password is required."),
  authValidator,
  login
);

authRouter.post(
  "/verify-otp",
  body("otp").notEmpty().withMessage("OTP is required."),
  authValidator,
  verifyOTP
);

authRouter.post(
  "/resend-otp",
  body("email").notEmpty().isEmail().withMessage("Invalid Email format."),
  authValidator,
  resendExpiredOTP
);

export default authRouter;
