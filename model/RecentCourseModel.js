import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Modules from "./ModulesModel.js";
import Checkout from "./CheckoutModel.js";
import CompletionCourse from "./CompletionCourseModel.js";
import CompletionModule from "./CompletionModuleModel.js";
import Assignment from "./AssignmentModel.js";
import Comment from "./CommentModel.js";
import ReviewCourse from "./ReviewCourseModel.js";

const RecentCourse = db.define(
  "recent_courses",
  {
    user_id: {
      type: DataTypes.UUID, // This should match the data type of user_id in users
      references: {
        model: "users",
        key: "user_id",
      },
    },
    course_id: {
      type: DataTypes.UUID, // This should match the data type of course_id in courses
      references: {
        model: "course",
        key: "course_id",
      },
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { freezeTableName: true }
);

export default RecentCourse;
