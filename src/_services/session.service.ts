import { compare } from "bcryptjs";
import dataSource from "../data-source";
import { User } from "../entities/users.entity";
import AppError from "../errors";
import { TUserLogin } from "../interfaces/user.interface";
import jwt from "jsonwebtoken"

export const loginService = async ({
  name,
  password,
}: TUserLogin): Promise<String> => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOneBy({ name: name });

  if(!user){
    throw new AppError("User not found",404)
  }

  const passwordMatch = await compare(password, user.password)
  if(!passwordMatch){
    throw new AppError("Sorry, user or password invalid", 401)
  }

  const token = jwt.sign(
    {
      isAdm: user.is_adm,
    },
    process.env.SECRET_KEY!,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );
  return token;
};
