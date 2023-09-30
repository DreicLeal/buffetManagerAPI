import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  password: z.string().min(4, "Password need to be 6 characters").max(4),
  is_adm: z.boolean().default(false),
  name: z.string().min(3),
});

export const userLogin = z.object({
  name: z.string(),
  password: z.string().min(6),
});
