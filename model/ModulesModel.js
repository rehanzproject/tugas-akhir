import { DataTypes } from "sequelize";
import db from "../config/database.js";
import CompletionModule from "./CompletionModuleModel.js";
import Quizzes from "./QuizzesModel.js";

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
    module_id: {
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
  },
  { freezeTableName: true },
);
Modules.hasMany(CompletionModule, {
  foreignKey: "module_id",
  sourceKey: "module_id",
});
CompletionModule.belongsTo(Modules, {
  foreignKey: "module_id",
  targetKey: "module_id",
});
Modules.hasMany(Quizzes, {
  foreignKey: "module_id",
  sourceKey: "module_id",
});
Quizzes.belongsTo(Modules, {
  foreignKey: "module_id",
  targetKey: "module_id",
});
export default Modules;
