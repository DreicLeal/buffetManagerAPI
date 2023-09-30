import { Request, Response } from "express";
import { TUserLogin } from "../interfaces/user.interface";
import { createUserService } from "../_services/user.services";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: TUserLogin = req["body"];
  const newUSer = await createUserService(userInfo);
  return res.status(201).json(newUSer);
};
