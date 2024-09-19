import { DataTypes } from "sequelize";
import db from "../config/database/database.js";
import Users from "./UserModel.js";
import Course from "./CourseModel.js";

const ReviewCourse = db.define(
  "review_courses",
  {
    course_id: {
      type: DataTypes.UUID, // This should match the data type of course_id in Products
      references: {
        model: "course",
        key: "course_id",
      },
    },
    user_id: {
        type: DataTypes.UUID, // This should match the data type of user_id in Products
        references: {
          model: "users",
          key: "user_id",
        },
      },
    review_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    description: { type: DataTypes.STRING },
    rating: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true },
);

export default ReviewCourse;
