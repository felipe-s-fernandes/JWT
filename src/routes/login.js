import express from "express";
const loginRouter = express.Router();
import loginController from "../controllers/login.js";

loginRouter.get("/:email", loginController.getuserData);
loginRouter.post("/", loginController.createSession);
loginRouter.delete("/", loginController.deleteSession);

export default loginRouter;
