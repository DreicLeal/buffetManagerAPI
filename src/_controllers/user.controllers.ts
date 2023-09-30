import { Request, Response } from "express";
import { TUserLogin } from "../interfaces/user.interface";
import { createUserService, getUserService } from "../_services/user.services";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userInfo: TUserLogin = req["body"];
  const newUSer = await createUserService(userInfo);
  return res.status(201).json(newUSer);
};

export const getUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: string = req["user"].id;

  const returnedUSer = await getUserService(userId);
  return res.status(200).json(returnedUSer);
};
