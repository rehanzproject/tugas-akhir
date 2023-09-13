import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  Login,
  Logout,
  Register,
  getUserByEmail,
  getUsers,
} from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { ForgotPassword } from "../controllers/ForgotPassword.js";
import { ShowPDF } from "../controllers/PDFMaker.js";
import {
  AddCourse,
  getCourse,
  getCourseUserCheckout,
} from "../controllers/Course.js";
import { addModule, getModules } from "../controllers/Modules.js";
import {
  getAllCheckout,
  getCheckout,
  getCheckoutVerify,
} from "../controllers/Checkout.js";
import {
  SaveDocument,
  SavePicture,
  upload,
} from "../controllers/UploadFile.js";

const UserRouter = express.Router();
// user
UserRouter.get("/info", verifyToken, getUserByEmail);
UserRouter.get("/ping", (req, res) => res.status(200).json({ msg: "PING!!" }));
UserRouter.get("/all", getUsers);
UserRouter.post("/register", Register);
UserRouter.post("/login", Login);
UserRouter.get("/token", refreshToken);
UserRouter.delete("/logout", Logout);
UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.get("/getPDF", verifyToken, ShowPDF);
// User course & modules
UserRouter.get("/course/checkout", verifyToken, getCourseUserCheckout);
UserRouter.post("/addcourse", AddCourse);
UserRouter.get("/modules", getModules);
UserRouter.post("/addmodule", verifyToken, addModule);
UserRouter.get("/course", getCourse);
// User Checkout
UserRouter.get("/checkout/history", verifyToken, getAllCheckout);
UserRouter.post("/checkout", verifyToken, getCheckout);
UserRouter.post("/checkout/verify", verifyToken, getCheckoutVerify);

// Upload
UserRouter.post(
  "/upload/picture",
  verifyToken,
  upload.single("file"),
  SavePicture,
);

UserRouter.post("/upload/document", verifyToken, SaveDocument);
export default UserRouter;
