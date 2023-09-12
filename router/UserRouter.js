import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { Login, Logout, Register, getUserByEmail, getUsers } from "../controllers/Users.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { ForgotPassword } from "../controllers/ForgotPassword.js";
import { ShowPDF } from "../controllers/PDFMaker.js";
import { AddCourse, getCourse } from "../controllers/Course.js";
import { getModules } from "../controllers/Modules.js";
import { getCheckout, getCheckoutVerify } from "../controllers/Checkout.js";
import {
  SaveDocument,
  SavePicture,
  upload,
} from "../controllers/UploadFile.js";

const UserRouter = express.Router();
UserRouter.get("/info", verifyToken, getUserByEmail);
UserRouter.get("/ping", (req, res) => res.status(200).json({ msg: "PING!!" }));
UserRouter.get("/all", getUsers);
UserRouter.post("/register", Register);
UserRouter.post("/login", Login);
UserRouter.get("/token", refreshToken);
UserRouter.delete("/logout", Logout);
UserRouter.post("/forgot-password", ForgotPassword);
UserRouter.get("/getPDF",verifyToken, ShowPDF);
// User course
UserRouter.post("/addcourse", AddCourse);
UserRouter.get("/modules", getModules);
UserRouter.get("/course", getCourse);
// User Checkout
UserRouter.post("/checkout", getCheckout);
UserRouter.post("/checkout/verify", getCheckoutVerify);
// Upload
UserRouter.post(
  "/upload/picture",
  verifyToken,
  upload.single("file"),
  SavePicture,
);

UserRouter.post("/upload/document", verifyToken, SaveDocument);
export default UserRouter;
