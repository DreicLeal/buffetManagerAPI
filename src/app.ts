import express, { Application } from "express";
import "reflect-metadata";
import "express-async-errors";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter} from "./routes/users.routes"
import handleError from "./middlewares/handleError.middleware"
import { dishRouter } from "./routes/dishes.routes";
import { loginRouter } from "./routes/login.routes";
import { messageRouter } from "./routes/message.routes";

export const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/dishes", dishRouter);
app.use("/message", messageRouter);

app.use(handleError);