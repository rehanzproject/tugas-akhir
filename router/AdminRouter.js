import express from "express";
import { Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { AddCourse, deleteCourse, getCourse, getCourseAdmin, getCourseDetail, getCourseReminder, getSummaryUser, resumeCourse, updateCourse } from "../controllers/Course.js";
import { addModule, deleteModule, updateModule } from "../controllers/Modules.js";
import { getAllCheckout } from "../controllers/Checkout.js";
import { addQuizzes, deleteQuizzes, getQuizzes, updateQuizzes } from "../controllers/Quizzes.js";
import { checkWhoEnrolled } from "../controllers/CompletionModules.js";
import { SaveThumbnail, uploadThumbnail } from "../controllers/UploadFile.js";
import { getInfo, getStats } from "../controllers/Stats.js";
import { getAllReviews } from "../controllers/ReviewCourse.js";
import { verifyTokenAdmin } from "../middleware/VerifyAdmin.js";

const AdminRouter = express.Router();

AdminRouter.post("/login", Login);
AdminRouter.delete("/logout", Logout);
//course
AdminRouter.get("/course", verifyTokenAdmin, getCourseAdmin);
AdminRouter.post("/course", verifyTokenAdmin, AddCourse);
AdminRouter.put("/course", verifyTokenAdmin, updateCourse);
AdminRouter.delete("/course", verifyTokenAdmin, deleteCourse);
AdminRouter.get("/course/detail", verifyTokenAdmin, getCourseDetail);
AdminRouter.post("/course/reminder", verifyTokenAdmin, getCourseReminder);

AdminRouter.post("/module", verifyTokenAdmin, addModule);
AdminRouter.get("/course/resumes", verifyTokenAdmin, resumeCourse);

AdminRouter.put("/module/update", verifyTokenAdmin, updateModule);
AdminRouter.delete("/module", verifyTokenAdmin, deleteModule);

AdminRouter.get("/who/enrolled/course", verifyTokenAdmin, checkWhoEnrolled);
AdminRouter.get("/course/resume", verifyTokenAdmin, getSummaryUser);
AdminRouter.get("/course/reviews", verifyTokenAdmin, getAllReviews);

AdminRouter.get("/checkout/history/all", verifyTokenAdmin, getAllCheckout);

AdminRouter.get("/module/quiz", verifyTokenAdmin, getQuizzes);
AdminRouter.post("/module/quiz", verifyTokenAdmin, addQuizzes);
AdminRouter.put("/module/quiz", verifyTokenAdmin, updateQuizzes);
AdminRouter.delete("/module/quiz", verifyTokenAdmin, deleteQuizzes);

AdminRouter.get("/stats", verifyTokenAdmin, getStats);
AdminRouter.get("/info", verifyTokenAdmin, getInfo);

AdminRouter.post(
    "/upload/thumbnail",
    verifyTokenAdmin,
    uploadThumbnail.single("file"),
    SaveThumbnail,
  );
export default AdminRouter;
