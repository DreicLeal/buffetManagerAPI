import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { deleteAllMessagesController, getMessagesController, postMessageController, updateMessageController } from "../_controllers/messages.controller";

export const messageRouter: Router = Router()

messageRouter.post("", ensureAuthMiddleware, postMessageController)
messageRouter.get("", ensureAuthMiddleware, getMessagesController )
messageRouter.patch("/:id", ensureAuthMiddleware, updateMessageController )
messageRouter.delete("", deleteAllMessagesController )