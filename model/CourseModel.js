import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Modules from "./ModulesModel.js";
import Checkout from "./CheckoutModel.js";
import CompletionCourse from "./CompletionCourseModel.js";
import CompletionModule from "./CompletionModuleModel.js";
import Assignment from "./AssignmentModel.js";
import Comment from "./CommentModel.js";
import ReviewCourse from "./ReviewCourseModel.js";

const Course = db.define(
  "course",
  {
    user_id: {
      type: DataTypes.UUID, // This should match the data type of user_id in users
      references: {
        model: "users",
        key: "user_id",
      },
    },
    course_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    thumbnail: { type: DataTypes.STRING },
    video: { type: DataTypes.STRING },
    document: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    price: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating1: {
      type: DataTypes.INTEGER,
    },
    rating2: {
      type: DataTypes.INTEGER,
    },
    rating3: {
      type: DataTypes.INTEGER,
    },
    rating4: {
      type: DataTypes.INTEGER,
    },
    rating5: {
      type: DataTypes.INTEGER,
    },
    coupon: { type: DataTypes.STRING },
    finished: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    user_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    member_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { freezeTableName: true }
);

Course.hasMany(Modules, {
  foreignKey: "course_id",
  sourceKey: "course_id",
});
Modules.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "course_id",
});
Course.hasMany(Checkout, {
  foreignKey: "course_id",
  sourceKey: "course_id",
});
Checkout.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "course_id",
});
Course.hasMany(CompletionCourse, {
  foreignKey: "course_id",
  sourceKey: "course_id",
});
CompletionCourse.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "course_id",
});
Course.hasMany(CompletionModule, {
  foreignKey: "course_id",
  sourceKey: "course_id",
});
CompletionModule.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "course_id",
});
Course.hasMany(Assignment, {
  foreignKey: "course_id",
  sourceKey: "course_id",
});
Assignment.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "course_id",
});
Course.hasMany(Comment, {
  foreignKey: "course_id",
  sourceKey: "course_id",
});
Comment.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "course_id",
});
Course.hasMany(ReviewCourse, {
  foreignKey: "course_id",
  sourceKey: "course_id",
});
ReviewCourse.belongsTo(Course, {
  foreignKey: "course_id",
  targetKey: "course_id",
});
export default Course;
