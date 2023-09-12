import express from "express";
import UserRouter from "./UserRouter.js";
import AdminRouter from "./AdminRouter.js";

const router = express.Router();
router.use("/admin", AdminRouter);
router.use("/user", UserRouter);

export default router;
