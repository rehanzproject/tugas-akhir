import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
  },
);

export default db;
