import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWTSECRET));
app.use(express.static("./public"));

import router from "./src/router.js";
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
