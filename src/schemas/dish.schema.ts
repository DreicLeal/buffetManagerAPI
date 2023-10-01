import { z } from "zod";

export const dishCreateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  level: z.number(),
  extra: z.boolean(),
  category: z.string().min(4),
  created_at: z.date(),
  updated_at: z.date(),
});

export const returnUserDishSchema = dishCreateSchema.omit({
  created_at: true,
  updated_at: true,
});
export const dishUpdateSchema = dishCreateSchema.partial();

export const dishesGetSchema = dishCreateSchema.array();
export const returnUserDishArray = returnUserDishSchema.array();
