import nodemailer from "nodemailer";
import { generateRandomNumbers } from "../helper/helperFunction.js";
import dotenv from "dotenv";
dotenv.config();
export const ForgotPassword = (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace with your email service provider (e.g., 'Gmail', 'Outlook', etc.)
    auth: {
      user: "rehanmaul111@gmail.com", // Replace with your Gmail email address
      pass: process.env.PASSWORD_EMAIL, // Replace with your Gmail password or an app-specific password
    },
  });
  const randomNumber = generateRandomNumbers();
  const mailOptions = {
    from: "hzfanny121@gmail.com",
    to: email,
    subject: "Reset Your Password",
    html: `<b>[${randomNumber}] </b> is your code OTP`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ msg: "Error sending email" });
      // Handle the error here, e.g., send an error response to the client
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ msg: "Email sent successfully" });
      // Handle the success here, e.g., send a success response to the client
    }
  });
};
