import jwt from "jsonwebtoken";
import Users from "../model/UserModel.js";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({
        code: 401,
        status: "Unauthorized",
        message: "Session has Expired",
        success: false,
      });
    const user = await Users.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!user)
      return res.status(401).json({
        code: 401,
        status: "Unauthorized",
        message: "Session has Expired",
        success: false,
      });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const { user_id, name, admin } = user;
        const accessToken = jwt.sign(
          { user_id, name, admin },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.status(200).json({
          code: 200,
          status: "OK",
          message: "Token has successfully updated",
          success: true,
          data: { accessToken },
        });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({
        code: 500,
        status: "Internal Server Error",
        message: "Internal Server Error",
        errors: { error },
      });
  }
};
