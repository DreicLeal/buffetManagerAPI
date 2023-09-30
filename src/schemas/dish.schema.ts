import { z } from "zod";

export const dishCreateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  category: z.string().min(4),
  created_at: z.string().or(z.date()),
  updated_at: z.string().or(z.date()),
});
export const dishUpdateSchema = dishCreateSchema.partial()

export const dishesGetSchema = dishCreateSchema.array()