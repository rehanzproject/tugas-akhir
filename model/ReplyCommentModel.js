import { DataTypes } from "sequelize";
import db from "../config/database/database.js";

const ReplyComment = db.define(
  "reply_comment",
  {
    comment_id: {
      type: DataTypes.UUID, // This should match the data type of comment_id in Products
      references: {
        model: "comment",
        key: "comment_id",
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
    text: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true },
);

export default ReplyComment;
