import { DataTypes, Sequelize } from "sequelize";
import db from "../config/database.js";
import Course from "./CourseModel.js";
import Checkout from "./CheckoutModel.js";
import CompletionCourse from "./CompletionCourseModel.js";

const Users = db.define(
  "users",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: { type: DataTypes.INTEGER },
    dob: { type: DataTypes.DATE },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { freezeTableName: true }
);
// relation with Users and Course
Users.hasMany(Course, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
Course.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
// relation with Users and Checkout
Users.hasMany(Checkout, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
Checkout.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

// relation with CompletionCourse and Course
Users.hasMany(CompletionCourse, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
CompletionCourse.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
export default Users;
