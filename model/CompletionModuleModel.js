import { DataTypes, Sequelize } from "sequelize";
import db from "../config/database.js";
import Course from "./CourseModel.js";
import Users from "./UserModel.js";

const CompletionModule = db.define(
  "completion_module",
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
    module_id: {
      type: DataTypes.UUID, // This should match the data type of module_id in Products
      references: {
        model: "modules",
        key: "module_id",
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
  { freezeTableName: true },
);
export default CompletionModule;
