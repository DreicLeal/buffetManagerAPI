import { Request, Response } from "express";
import {
  deleteAllMessagesService,
  getMessagesService,
  postMessageService,
  updateMessageService,
} from "../_services/messages.service";

export const postMessageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const content = req.body;
  const userId = req.user.id;
  const newMessage = await postMessageService(userId, content);
  return res.status(201).json(newMessage);
};

export const getMessagesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const messages = await getMessagesService();
  return res.status(200).json(messages);
};

export const updateMessageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
    const messageId = req.params.id
    const newContent = req.body
  const updatedMessage = await updateMessageService(messageId, newContent);
  return res.status(200).json(updatedMessage);
};

export const deleteAllMessagesController = async(req:Request, res:Response) => {
  await deleteAllMessagesService()
  return res.status(204).json({})
} 
