import { response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return response.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        code: 401,
        status: "Unauthorized",
        message: "Session has Expired. Please Login Again",
        success: false,
      });

    req.email = decoded.email;
    req.userId = decoded.user_id;
    next();
  });
};
