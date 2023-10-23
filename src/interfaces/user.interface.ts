import { z } from "zod";
import { userLogin, userSchema } from "../schemas/user.schema";

export type TUser = z.infer<typeof userSchema>
export type TUserLogin = z.infer<typeof userLogin>