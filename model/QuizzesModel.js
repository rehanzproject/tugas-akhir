import { DataTypes } from "sequelize";
import db from "../config/database/database.js";

const Quizzes = db.define(
  "quizzes",
  {
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
    data: {
      type: DataTypes.JSON,
    },
  },
  { freezeTableName: true },
);

export default Quizzes;
