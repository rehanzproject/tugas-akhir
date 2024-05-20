import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  Login,
  Logout,
  Register,
  changeIdentity,
  getUserByEmail,
} from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { changePassword, CheckOTP, ForgotPassword } from "../controllers/ForgotPassword.js";
import { ShowPDF } from "../controllers/PDFMaker.js";
import {
  AddCourse,
  getCourse,
  getCourseUserCheckout,
  searchCourse,
} from "../controllers/Course.js";
import { addModule, getModules } from "../controllers/Modules.js";
import {
  addCheckout,
  getAllCheckout,
  getCheckoutUser,
  getCheckoutVerify,
  getCheckoutByUser
} from "../controllers/Checkout.js";
import {
  SaveDocument,
  SavePicture,
  SaveThumbnail,
  upload,
  uploadThumbnail,
} from "../controllers/UploadFile.js";
import {
  AddComment,
  AddReplyComment,
  GetCommentByCourseID,
} from "../controllers/Comment.js";
import { addQuizzes, getQuiz } from "../controllers/Quizzes.js";
import { getCompletion, ReviewCourses } from "../controllers/ReviewCourse.js";

const UserRouter = express.Router();
// user
UserRouter.get("/info", verifyToken, getUserByEmail);
UserRouter.get("/ping", (req, res) => res.status(200).json({ msg: "PING!!" }));
UserRouter.post("/register", Register);
UserRouter.post("/login", Login);
UserRouter.get("/token", refreshToken);
UserRouter.delete("/logout", verifyToken, Logout);
UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.post("/check-otp", CheckOTP);
UserRouter.post("/change-password", changePassword);
UserRouter.post("/info/edit",verifyToken, changeIdentity);

UserRouter.get("/getPDF", verifyToken, ShowPDF);
// User course & modules
UserRouter.get("/course/checkout", verifyToken, getCourseUserCheckout);
UserRouter.get("/modules", verifyToken, getModules);
UserRouter.get("/course", verifyToken, getCourse);
UserRouter.get("/search/course", verifyToken, searchCourse);

// User Checkout
UserRouter.get("/checkout/history/user", verifyToken, getCheckoutByUser);
UserRouter.get("/checkout", verifyToken, getCheckoutUser);
UserRouter.post("/checkout", verifyToken, addCheckout);
UserRouter.post("/checkout/verify", verifyToken, getCheckoutVerify);

// Review & completion
UserRouter.post("/certificate" , verifyToken, getCompletion);
UserRouter.post("/review" , verifyToken, ReviewCourses);

// Upload
UserRouter.post(
  "/upload/picture",
  verifyToken,
  upload.single("file"),
  SavePicture,
);
UserRouter.post(
  "/upload/thumbnail",
  verifyToken,
  uploadThumbnail.single("file"),
  SaveThumbnail,
);
UserRouter.post("/upload/document", verifyToken, SaveDocument);

// comment
UserRouter.post("/course/comment", verifyToken, AddComment);
UserRouter.post("/course/comment/reply", verifyToken, AddReplyComment);
UserRouter.get("/course/comments", verifyToken, GetCommentByCourseID);

// quiz
UserRouter.get("/module/quiz", verifyToken, getQuiz);

export default UserRouter;
