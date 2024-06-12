import express from "express";
import { Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { AddCourse, deleteCourse, getCourse, getCourseDetail, getSummaryUser, resumeCourse, updateCourse } from "../controllers/Course.js";
import { addModule, deleteModule, updateModule } from "../controllers/Modules.js";
import { getAllCheckout } from "../controllers/Checkout.js";
import { addQuizzes, deleteQuizzes, getQuizzes, updateQuizzes } from "../controllers/Quizzes.js";
import { checkWhoEnrolled } from "../controllers/CompletionModules.js";
import { SaveThumbnail, uploadThumbnail } from "../controllers/UploadFile.js";
import { getInfo, getStats } from "../controllers/Stats.js";
import { getAllReviews } from "../controllers/ReviewCourse.js";

const AdminRouter = express.Router();

AdminRouter.post("/login", Login);
AdminRouter.delete("/logout", Logout);
//course
AdminRouter.get("/course", verifyToken, getCourse);
AdminRouter.post("/course", verifyToken, AddCourse);
AdminRouter.put("/course", verifyToken, updateCourse);
AdminRouter.delete("/course", verifyToken, deleteCourse);
AdminRouter.get("/course/detail", verifyToken, getCourseDetail);

AdminRouter.post("/module", verifyToken, addModule);
AdminRouter.get("/course/resumes", verifyToken, resumeCourse);

AdminRouter.put("/module/update", verifyToken, updateModule);
AdminRouter.delete("/module", verifyToken, deleteModule);

AdminRouter.get("/who/enrolled/course", verifyToken, checkWhoEnrolled);
AdminRouter.get("/course/resume", verifyToken, getSummaryUser);
AdminRouter.get("/course/reviews", verifyToken, getAllReviews);

AdminRouter.get("/checkout/history/all", verifyToken, getAllCheckout);

AdminRouter.get("/module/quiz", verifyToken, getQuizzes);
AdminRouter.post("/module/quiz", verifyToken, addQuizzes);
AdminRouter.put("/module/quiz", verifyToken, updateQuizzes);
AdminRouter.delete("/module/quiz", verifyToken, deleteQuizzes);

AdminRouter.get("/stats", verifyToken, getStats);
AdminRouter.get("/info", verifyToken, getInfo);

AdminRouter.post(
    "/upload/thumbnail",
    verifyToken,
    uploadThumbnail.single("file"),
    SaveThumbnail,
  );
export default AdminRouter;
