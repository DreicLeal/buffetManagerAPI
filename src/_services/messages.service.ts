import dataSource from "../data-source";
import { Message } from "../entities/messages.entity";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import {
  messagePostSchema,
  messageUpdateSchema,
} from "../schemas/message.schema";

export const postMessageService = async (userId: string, content) => {
  const userRepository = dataSource.getRepository(User);
  const messagesRepository = dataSource.getRepository(Message);
  const foundUser = await userRepository.findOneBy({ id: userId });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const newMessage = messagesRepository.create({
    ...content,
    user: foundUser.id,
  });
  await messagesRepository.save(newMessage);

  const messageResponse = messagePostSchema.parse(newMessage);

  return messageResponse;
};

export const getMessagesService = async () => {
  const messagesRepository = dataSource.getRepository(Message);
  const allMessages = await messagesRepository.find({
    relations: {
      user: true,
    },
    select: {
      user: {
        id: true,
        name: true,
      },
    },
  });
  if (allMessages.length === 0) {
    throw new AppError("No messages registered.", 404);
  }

  return allMessages;
};

export const updateMessageService = async (messageId: string, newContent) => {
  const messagesRepository = dataSource.getRepository(Message);

  const messageToUpdate = await messagesRepository.findOneBy({ id: messageId });

  if (!messageToUpdate) {
    throw new AppError("We can't found this message", 404);
  }

  messageToUpdate.checked = newContent.checked;
  await messagesRepository.save(messageToUpdate);
  const updateMessageResponse = messageUpdateSchema.parse(messageToUpdate);
  return updateMessageResponse;
};

export const deleteAllMessagesService = async () => {

  const messagesRepository = dataSource.getRepository(Message)

  const allMessages = await messagesRepository.find()

  if(allMessages.length === 0){
    throw new AppError("We don't have more messages", 404)
  }

  messagesRepository.remove(allMessages)
}
