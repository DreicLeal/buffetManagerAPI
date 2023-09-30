import dataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import { TUser, TUserLogin } from "../interfaces/user.interface";
import { userReturnSchema } from "../schemas/user.schema";

export const createUserService = async (
  userInfo: TUserLogin
): Promise<TUser> => {
  const userRepository = dataSource.getRepository(User);
  const userExists = await userRepository.findOneBy({ name: userInfo.name });

  if (userExists) {
    throw new AppError(
      "User Already registered, try with new credentials",
      409
    );
  }

  const newUser = userRepository.create(userInfo);
  await userRepository.save(newUser);

  const userResponse = userReturnSchema.parse(newUser);

  return userResponse;
};

export const getUserService = async (userId: string) => {
  const userRepository = dataSource.getRepository(User);
  const userFound = await userRepository.findOneBy({ id: userId });
  const userResponse = userReturnSchema.parse(userFound);

  return userResponse;
};
