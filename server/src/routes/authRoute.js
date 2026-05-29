import { Signup, Login } from "../controllers/authController.js";
import userVerification from "../middlewares/AuthMiddleware.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/signup", Signup);
authRouter.post("/login", Login);
authRouter.post("/", userVerification);

export default authRouter;
