import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import {
  createDishController,
  getDishController,
  getDishesController,
} from "../_controllers/dish.controllers";

export const dishRouter: Router = Router();

dishRouter.post("", ensureAuthMiddleware, createDishController);
dishRouter.get("/:id", getDishController);
dishRouter.get("", getDishesController);
dishRouter.patch("");
dishRouter.delete("");
