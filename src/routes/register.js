import express from "express";
const registerRouter = express.Router();
import registerController from "../controllers/register.js";

registerRouter.post("/", registerController.registerUser);

export default registerRouter;
