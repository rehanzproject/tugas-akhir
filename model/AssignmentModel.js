import { DataTypes } from "sequelize";
import db from "../config/database/database.js";

const Assignment = db.define(
  "assignment",
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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    document: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true },
);

export default Assignment;
