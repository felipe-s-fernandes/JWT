import express from "express";
const router = express.Router();
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";

router.use("/login", loginRouter);
router.use("/register", registerRouter);

export default router;
