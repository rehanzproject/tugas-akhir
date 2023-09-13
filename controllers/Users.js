import jwt from "jsonwebtoken";
import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    if (!users)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "User Not Found",
        success: false,
      });

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error. Try Again",
      errors: { error },
    });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.email },
      attributes: ["name", "email", "phone", "image"],
    });
    if (!user)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Account Not Found",
        success: false,
      });

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  try {
    Users.findOne({
      where: {
        email: email,
      },
    }).then(async (existingUser) => {
      if (existingUser)
        return res.status(400).json({
          code: 400,
          status: "Bad Request",
          message: "Email has already been registered",
          success: false,
        });
      else {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await Users.create({
          name: name,
          email: email,
          password: hashPassword,
        });
        res.status(201).json({
          code: 201,
          status: "Created",
          message: "User Register Successfully",
          success: true,
          data: user,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Wrong Password",
        success: false,
      });
    const { admin, user_id, email } = user;
    const accessToken = jwt.sign(
      { admin, user_id, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      },
    );
    const refreshToken = jwt.sign(
      { admin, user_id, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
    );
    await user.update({ refreshToken: refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      code: 200,
      status: "OK",
      message: "Success Login",
      success: true,
      data: accessToken,
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      status: "Not Found",
      message: "Email Not Found",
      success: false,
    });
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.json({
        code: 204,
        status: "No Content",
        message: "No Content",
        success: true,
      });
    const user = await Users.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user)
      return res.json({
        code: 204,
        status: "No Content",
        message: "No Content",
        success: true,
      });
    await user.update({ refreshToken: null });
    res.clearCookie("refreshToken");
    return res.json({
      code: 200,
      status: "OK",
      message: "Success Logout",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
