import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  Login,
  Logout,
  Register,
  getUserByEmail,
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
  addCheckout,
  getAllCheckout,
  getCheckoutUser,
  getCheckoutVerify,
} from "../controllers/Checkout.js";
import {
  SaveDocument,
  SavePicture,
  upload,
} from "../controllers/UploadFile.js";
import {
  AddComment,
  AddReplyComment,
  GetCommentByCourseID,
} from "../controllers/Comment.js";

const UserRouter = express.Router();
// user
UserRouter.get("/info", verifyToken, getUserByEmail);
UserRouter.get("/ping", (req, res) => res.status(200).json({ msg: "PING!!" }));
UserRouter.post("/register", Register);
UserRouter.post("/login", Login);
UserRouter.get("/token", refreshToken);
UserRouter.delete("/logout", Logout);
UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.get("/getPDF", verifyToken, ShowPDF);
// User course & modules
UserRouter.get("/course/checkout", verifyToken, getCourseUserCheckout);
UserRouter.post("/addcourse", verifyToken, AddCourse);
UserRouter.get("/modules", verifyToken, getModules);
UserRouter.post("/addmodule", verifyToken, addModule);
UserRouter.get("/course", verifyToken, getCourse);
// User Checkout
UserRouter.get("/checkout/history", verifyToken, getAllCheckout);
UserRouter.get("/checkout", verifyToken, getCheckoutUser);
UserRouter.post("/checkout", verifyToken, addCheckout);
UserRouter.post("/checkout/verify", verifyToken, getCheckoutVerify);

// Upload
UserRouter.post(
  "/upload/picture",
  verifyToken,
  upload.single("file"),
  SavePicture,
);
UserRouter.post("/upload/document", verifyToken, SaveDocument);

// comment
UserRouter.post("/course/comment", verifyToken, AddComment);
UserRouter.post("/course/comment/reply", verifyToken, AddReplyComment);
UserRouter.get("/course/comments", verifyToken, GetCommentByCourseID);

export default UserRouter;
