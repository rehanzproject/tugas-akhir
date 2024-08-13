import { DataTypes, Sequelize } from "sequelize";
import db from "../config/database.js";
import Course from "./CourseModel.js";
import Checkout from "./CheckoutModel.js";
import CompletionCourse from "./CompletionCourseModel.js";
import CompletionModule from "./CompletionModuleModel.js";
import Assignment from "./AssignmentModel.js";
import Comment from "./CommentModel.js";
import ReplyComment from "./ReplyCommentModel.js";
import ReviewCourse from "./ReviewCourseModel.js";
import RecentCourse from "./RecentCourseModel.js";

const Users = db.define(
  "users",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nim: {
      type: DataTypes.INTEGER,
    },
    nip: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: { type: DataTypes.BIGINT },
    code_otp: { type: DataTypes.INTEGER },
    dob: { type: DataTypes.DATE },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    refreshToken: {
      type: DataTypes.STRING(1024),
    },
    image: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.INTEGER,
    },
    prodi: {
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

// relation with CompletionCourse and User
Users.hasMany(CompletionCourse, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
CompletionCourse.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

// relation with CompletionModule and User
Users.hasMany(CompletionModule, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
CompletionModule.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

// relation with Assignment and User
Users.hasMany(Assignment, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
Assignment.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

// relation with Comment, ReplyComment and User
Users.hasMany(Comment, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
Comment.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
Users.hasMany(ReplyComment, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
ReplyComment.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
// relation with Review Course

Users.hasMany(ReviewCourse, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
ReviewCourse.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

Users.hasMany(RecentCourse, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});
RecentCourse.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});
export default Users;
