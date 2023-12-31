import { NextFunction, Request, Response } from "express";
import AppError from "../errors";

export const signUpFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, name } = req["body"];
  if (!password || !name) {
    throw new AppError(
      "You need to fulfill all the required fields to create an account",
      400
    );
  }

  return next();
};
