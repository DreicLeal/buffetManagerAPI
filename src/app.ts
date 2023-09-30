import express, { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import { userRouter} from "./routes/users.routes"
import handleError from "./middlewares/handleError.middleware"
import { dishRouter } from "./routes/dishes.routes";
import { loginRouter } from "./routes/login.routes";

export const app: Application = express();
app.use(json());
app.use(cors());
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/dishes", dishRouter);

app.use(handleError);