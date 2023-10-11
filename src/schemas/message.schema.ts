import { z } from "zod";

export const messagePostSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  checked: z.boolean().default(false),
  created_at: z.date(),
  user: z.string().optional(),
});
export const messageUpdateSchema = messagePostSchema.partial();

export const messagesGetSchemaArr = messagePostSchema.array();
