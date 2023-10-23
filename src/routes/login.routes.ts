import { Router } from "express";
import { loginController } from "../_controllers/session.controller";

export const loginRouter:Router = Router()

loginRouter.post("", loginController)