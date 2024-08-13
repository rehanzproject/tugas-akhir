import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import router from "./router/index.js";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import compression from "compression";
import cors from "cors";
import Course from "./model/CourseModel.js";
import Modules from "./model/ModulesModel.js";
import Checkout from "./model/CheckoutModel.js";
import CompletionCourse from "./model/CompletionCourseModel.js";
import CompletionModule from "./model/CompletionModuleModel.js";
import Comment from "./model/CommentModel.js";
import ReplyComment from "./model/ReplyCommentModel.js";
import ReviewCourse from "./model/ReviewCourseModel.js";
import Quizzes from "./model/QuizzesModel.js";
import Users from "./model/UserModel.js";
import RecentCourse from "./model/RecentCourseModel.js";
import { options } from "./option.js";
import admin from "firebase-admin";
import serviceAccount from './tugas-akhir-717e9-firebase-adminsdk-cwemt-1b81367285.json' assert { type: 'json' };
import { initializeApp } from "firebase-admin/app";
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
  // await Users.sync()
  // await Course.sync()
  // await Modules.sync()
  // await Checkout.sync()
  // await CompletionCourse.sync()
  // await CompletionModule.sync()
  // await Comment.sync()
  // await ReplyComment.sync()
  // await ReviewCourse.sync()
  // await Quizzes.sync()
  // await RecentCourse.sync()
  // drop
  // await RecentCourse.drop()
  // await Quizzes.drop()
  // await ReviewCourse.drop()
  // await ReplyComment.drop()
  // await CompletionModule.drop()
  // await CompletionCourse.drop()
  // await Checkout.drop()
  // await Modules.drop()
  // await Comment.drop()
  // await Course.drop()
  // await Users.drop()
} catch (error) {
  console.error("error :", error);
}

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors(corsOptionsDelegate));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
var allowlist = [
  "http://localhost:5173",
  "https://rahmamaulina211210005.my.id/",
  "https://tugas-akhir-admin.vercel.app/",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: CSS_URL, explorer: true })
);
app.use("/api/v1", router);
app.use(express.static("public"));
// app.use(express.static("template"));
app.listen(process.env.PORT, () =>
  console.log(`server running at port ${process.env.PORT}`)
);

export default app;
