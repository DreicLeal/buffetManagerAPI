import { Router } from "express";
import { createUserController, getUserController } from "../_controllers/user.controllers";
import { signUpFieldsMiddleware } from "../middlewares/signUpFields.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

export const userRouter: Router = Router();

userRouter.post("", signUpFieldsMiddleware, createUserController);
userRouter.get("", ensureAuthMiddleware, getUserController);
