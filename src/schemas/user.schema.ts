import { z } from "zod";
import { returnUserDishArray } from "./dish.schema";
export const userSchema = z.object({
  id: z.string().uuid(),
  password: z
    .string()
    .min(4, "Password need to be at least 4 characters")
    .max(4),
  is_adm: z.boolean().default(false),
  name: z.string().min(3),
});
export const userReturnSchema = z.object({
  id: z.string().uuid(),
  is_adm: z.boolean().default(false),
  name: z.string().min(3),
  dishes: returnUserDishArray,
});

export const userLogin = z.object({
  name: z.string(),
  password: z.string().min(6),
});
