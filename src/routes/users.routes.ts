import { Router } from "express";
import { createUserController } from "../_controllers/user.controllers";
import { signUpFieldsMiddleware } from "../middlewares/signUpFields.middleware";

export const userRouter: Router = Router();

userRouter.post("", signUpFieldsMiddleware, createUserController);
