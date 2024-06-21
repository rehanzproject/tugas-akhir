import jwt from "jsonwebtoken";

export const verifyTokenAdmin = (req, res, next, checkAdmin = false) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  
    if (err) {
      return res.status(401).json({
        code: 401,
        status: "Unauthorized",
        message: "Session has Expired. Please Login Again",
        success: false,
      });
    }
    if (!decoded.admin) {
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        message: "You do not have the required admin privileges",
        success: false,
      });
    }

    req.email = decoded.email;
    req.userId = decoded.user_id;
    req.isAdmin = decoded.admin;
    if (checkAdmin && !req.isAdmin) {
      return res.status(403).json({
        code: 403,
        status: "Forbidden",
        message: "You do not have the required admin privileges",
        success: false,
      });
    }

    next();
  });
};
