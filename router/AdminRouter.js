import express from "express";
import { Login, Logout } from "../controllers/Users.js";

const AdminRouter = express.Router();
AdminRouter.post("/login", Login);
AdminRouter.delete("/logout", Logout);

export default AdminRouter;
