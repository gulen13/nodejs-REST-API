import express from "express";
import { validateBody } from "../middlewares/index.js";
import { userSignupSchema, userSigninSchema } from "../schemas/userSchema.js"
import authController from "../controllers/auth-controller.js"
import { authenticate } from "../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userSignupSchema), authController.signup)

authRouter.post("/login", validateBody(userSigninSchema), authController.signin)

authRouter.get("/current", authenticate, authController.getcurrent)

authRouter.post("/logout", authenticate, authController.signout)

export default authRouter;