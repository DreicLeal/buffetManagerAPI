import { Request, Response } from "express"
import { postMessageService } from "../_services/messages.service"

export const postMessageController = async (req:Request, res:Response):Promise<Response> => {
    const content = req["body"]
    const userId = req["user"].id
    const newMessage = await postMessageService(userId, content)
    return res.status(201).json(newMessage)

}