
import { z } from "zod";
import { dishCreateSchema, dishUpdateSchema, dishesGetSchema } from "../schemas/dish.schema";

export type TDish = z.infer<typeof dishCreateSchema>
export type TGetDishes = z.infer<typeof dishesGetSchema>
export type TDishUpdate = z.infer<typeof dishUpdateSchema>