import { DataTypes } from "sequelize";
import db from "../config/database.js";
import ReplyComment from "./ReplyCommentModel.js";

const Comment = db.define(
  "comment",
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
    comment_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
    }
  },
  { freezeTableName: true },
);
Comment.hasMany(ReplyComment, {
    foreignKey: "comment_id",
    sourceKey: "comment_id",
  });
  ReplyComment.belongsTo(Comment, {
    foreignKey: "comment_id",
    targetKey: "comment_id",
  });
export default Comment;
