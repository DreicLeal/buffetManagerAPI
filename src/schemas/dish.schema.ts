import { z } from "zod";

const dateOrIso8601String = z.union([
  z.date(),
  z.string().refine((str) => !isNaN(Date.parse(str)), {
    message: "Expected date or ISO 8601 string",
  }),
]);

export const dishCreateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  level: z.number(),
  extra: z.boolean(),
  category: z.string().min(4),
  created_at: dateOrIso8601String,
  timer: dateOrIso8601String.nullable(),
  updated_at: dateOrIso8601String,
});

export const returnUserDishSchema = dishCreateSchema.omit({
  created_at: true,
  updated_at: true,
});
export const dishUpdateSchema = dishCreateSchema.partial();

export const dishesGetSchema = dishCreateSchema.array();
export const returnUserDishArray = returnUserDishSchema.array();
