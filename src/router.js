import express from "express";
const router = express.Router();
import loginRouter from "./routes/login.js";

router.use("/login", loginRouter);

export default router;
