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
        code_otp: req.body.otp,
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
      data: getUser.user_id,
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
export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const getUser = await Users.findOne({
      where: {
        user_id: req.query.id,
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
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const { admin, user_id, email } = getUser;
    const accessToken = jwt.sign(
      { admin, user_id, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const refreshToken = jwt.sign(
      { admin, user_id, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await getUser.update({
      refreshToken: refreshToken,
      password: hashPassword,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      code: 200,
      status: "OK",
      message: "Change Password Successfully",
      success: true,
      data: accessToken,
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
