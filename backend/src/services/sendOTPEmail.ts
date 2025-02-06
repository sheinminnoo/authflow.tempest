import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const sendOTPEmail = async (
  email: string,
  otp: string,
  username: String
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Render the OTP template using EJS
    const emailTemplatePath = path.resolve(__dirname, "../views/otpEmail.ejs");
    const emailContent = await ejs.renderFile(emailTemplatePath, {
      otp,
      username,
    });

    // Email options
    const mailOptions = {
      from: `"AuthFlow Tempest" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Your OTP Code",
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully to", email);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export default sendOTPEmail;
