import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import router from "./router/index.js";
import Users from "./model/UserModel.js";
import Course from "./model/CourseModel.js";
import Modules from "./model/ModulesModel.js";
import Checkout from "./model/CheckoutModel.js";
import CompletionCourse from "./model/CompletionCourseModel.js";
import CompletionModule from "./model/CompletionModuleModel.js";
import Comment from "./model/CommentModel.js";
import ReplyComment from "./model/ReplyCommentModel.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
  // await Users.sync()
  // await Course.sync()
  // await Modules.sync()
  // await Comment.sync()
  // await Checkout.sync()
  // await CompletionCourse.sync()
  // await CompletionModule.sync()
  // await ReplyComment.sync()
} catch (error) {
  console.error(error);
}
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);
app.use(express.static("public"));
// app.use(express.static("template"));
app.listen(process.env.PORT, () => console.log(`server running at port 5000`));

export default app;
