import express from "express";
import { Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { AddCourse } from "../controllers/Course.js";
import { addModule } from "../controllers/Modules.js";
import { getAllCheckout } from "../controllers/Checkout.js";
import { addQuizzes } from "../controllers/Quizzes.js";

const AdminRouter = express.Router();
AdminRouter.post("/login", Login);
AdminRouter.delete("/logout", Logout);
AdminRouter.post("/course", verifyToken, AddCourse);
AdminRouter.post("/module", verifyToken, addModule);

AdminRouter.get("/checkout/history/all", verifyToken, getAllCheckout);
AdminRouter.post("/module/quiz", verifyToken, addQuizzes);

export default AdminRouter;
