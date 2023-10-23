import { Request, Response } from "express";
import { TUserLogin } from "../interfaces/user.interface";
import { loginService } from "../_services/session.service";

export const loginController = async (req: Request, res: Response) => {
  const loginInfo: TUserLogin = req.body;
  const token = await loginService(loginInfo);
  console.log(token)

  return res.status(200).json({ token });
};
