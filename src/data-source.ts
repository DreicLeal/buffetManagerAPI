import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/users.entity";
import { Dish } from "./entities/dishes.entity";
import { User_dish } from "./entities/users_dishes.entity";
import { Message } from "./entities/messages.entity";
import { InitialMigration1697475800114 } from "./migrations/1697475800114-InitialMigration";

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
    entities: [User, Dish, User_dish, Message],
    migrations: [InitialMigration1697475800114],
  };
};

const AppDataSource = setDataSourceConfig();
export default new DataSource(AppDataSource);
