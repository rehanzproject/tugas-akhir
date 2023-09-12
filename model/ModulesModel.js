import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Modules = db.define(
  "modules",
  {
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
    name: {
      type: DataTypes.STRING,
    },
    desc: { type: DataTypes.STRING },
    price: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    document: {
      type: DataTypes.JSON,
    },
  },
  { freezeTableName: true },
);

export default Modules;
