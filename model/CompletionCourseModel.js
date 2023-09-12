import { DataTypes, Sequelize } from "sequelize";
import db from "../config/database.js";
import Course from "./CourseModel.js";
import Users from "./UserModel.js";

const CompletionCourse = db.define(
  "completion_courses",
  {
    user_id: {
      type: DataTypes.UUID, // This should match the data type of course_id in Products
      references: {
        model: "users",
        key: "user_id",
      },
    },
    course_id: {
      type: DataTypes.UUID, // This should match the data type of course_id in Products
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
    score: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);
export default CompletionCourse;
