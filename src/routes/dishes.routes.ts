import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { createDishController, getDishController } from "../_controllers/dish.controllers";

export const dishRouter: Router = Router();

dishRouter.post("", ensureAuthMiddleware, createDishController);
dishRouter.get("/:id", getDishController);
dishRouter.patch("");
dishRouter.delete("");
