import express from "express";
import { validateBody } from "../middlewares/index.js";
import { userSignupSchema, userSigninSchema } from "../schemas/userSchema.js"
import authController from "../controllers/auth.js"

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), authController.signup)

export default authRouter;