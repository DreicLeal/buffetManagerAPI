import dataSource from "../data-source";
import { Message } from "../entities/messages.entity";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import { messagePostSchema } from "../schemas/message.schema";

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
