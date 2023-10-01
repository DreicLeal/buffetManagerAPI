import { Request, Response } from "express";
import { TDish } from "../interfaces/dishes.interface";
import { createDishService, getDishService, getDishesService } from "../_services/dish.services";

export const createDishController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dishInfo: TDish = req["body"];
  const userInfo: string = req["user"].id;
  const newDish = await createDishService(dishInfo, userInfo);

  return res.status(201).json(newDish);
};
export const getDishController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const dishId: string = req.params.id;
  const foundDish = await getDishService(dishId);

  return res.status(200).json(foundDish);
};
export const getDishesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const foundDish = await getDishesService();

  return res.status(200).json(foundDish);
};
