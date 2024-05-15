import nodemailer from "nodemailer";
import { generateRandomNumbers } from "../helper/helperFunction.js";
import dotenv from "dotenv";
import Users from "../model/UserModel.js";
dotenv.config();
export const ForgotPassword = async (req, res) => {
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
    to: email,
    subject: "Reset Your Password",
    html: `<b>[${randomNumber}] </b> Adalah Kode OTP Kamu , Gunakan ini untuk verifikasi akun emailmu`,
  };
  const getUser = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (!getUser)
    return res.status(404).json({
      code: 404,
      status: "Not Found",
      message: "Email Not Found",
      success: false,
    });
  
    await getUser.update({
    code_otp: randomNumber,
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ msg: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      res
        .status(200)
        .json({ msg: "Email sent successfully", otp: randomNumber });
    }
  });
};

export const CheckOTP = async (req, res) => {
  try {
    const getUser = await Users.findOne({
      where: {
        code_otp: req.body.otp
      },
    });
    if (!getUser) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Unable to find user",
        success: false,
      });
    }

    if (getUser.code_otp !== req.body.otp)
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Wrong OTP",
        success: false,
      });

    res.json({
      code: 200,
      status: "OK",
      message: "OTP was Paired Successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
    });
  }
};
