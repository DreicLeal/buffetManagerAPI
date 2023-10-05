import dataSource from "../data-source";
import { Message } from "../entities/messages.entity";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import { messagePostSchema } from "../schemas/message.schema";

export const postMessageService = async (userId: string, content) => {
  const userRepository = dataSource.getRepository(User);
  const messagesRepository = dataSource.getRepository(Message);
  const foundUser = await  userRepository.findOneBy({ id: userId });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const newMessage = messagesRepository.create({...content, user:foundUser.id} );
  await messagesRepository.save(newMessage);

  const messageResponse = messagePostSchema.parse(newMessage);

  return messageResponse;
};
