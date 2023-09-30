import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/users.entity";
import { Dish } from "./entities/dishes.entity";
import { User_dish } from "./entities/users_dishes.entity";
import {InitialMigration1696077059050} from "./migrations/1696077059050-InitialMigration"
 
const setDataSourceConfig = (): DataSourceOptions => {
  const dbURL: string | undefined = process.env.DATABASE_URL;
  if (!dbURL) {
    throw new Error("Var env DATABASE_URL is not defined");
  }

  return {
    type: "postgres",
    url: dbURL,
    synchronize: false,
    logging: true,
    entities: [User, Dish, User_dish],
    migrations: [
      InitialMigration1696077059050
    ],
  };
};

const AppDataSource = setDataSourceConfig();
export default new DataSource(AppDataSource);
