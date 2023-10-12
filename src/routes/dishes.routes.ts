import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import {
  createDishController,
  deleteAllDishesController,
  deleteDishController,
  getDishController,
  getDishesController,
  updateDishController,
} from "../_controllers/dish.controllers";

export const dishRouter: Router = Router();

dishRouter.post("", ensureAuthMiddleware, createDishController);
dishRouter.get("/:id", getDishController);
dishRouter.get("", getDishesController);
dishRouter.patch("/:id", updateDishController);
dishRouter.delete("/:id", deleteDishController);
dishRouter.delete("", deleteAllDishesController);
