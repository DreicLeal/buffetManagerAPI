import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { postMessageController } from "../_controllers/messages.controller";

export const messageRouter: Router = Router()

messageRouter.post("", ensureAuthMiddleware, postMessageController)
// messageRouter.get("", ensureAuthMiddleware, getMessagesController )