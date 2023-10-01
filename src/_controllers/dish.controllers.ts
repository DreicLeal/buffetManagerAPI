import { Request, Response } from "express";
import { TDish } from "../interfaces/dishes.interface";
import { createDishService } from "../_services/dish.services";

export const createDishController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dishInfo: TDish = req["body"];
  const userInfo: string = req["user"].id;
  const newDish = await createDishService(dishInfo, userInfo);

  return res.status(201).json(newDish);
};
