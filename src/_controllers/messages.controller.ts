import { Request, Response } from "express";
import {
  getMessagesService,
  postMessageService,
} from "../_services/messages.service";

export const postMessageController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const content = req["body"];
  const userId = req["user"].id;
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
