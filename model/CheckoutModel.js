import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Checkout = db.define(
  "checkout",
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
    payment_method: {
      type: DataTypes.STRING,
    },
    verify: {
      type: DataTypes.BOOLEAN,
    },
  },
  { freezeTableName: true },
);

export default Checkout;
