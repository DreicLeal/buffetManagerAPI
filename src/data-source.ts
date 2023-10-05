import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/users.entity";
import { Dish } from "./entities/dishes.entity";
import { User_dish } from "./entities/users_dishes.entity";
import { Message } from "./entities/messages.entity";
import { InitialMigration1696077059050 } from "./migrations/1696077059050-InitialMigration";
import { AdmFieldFixing1696081264702 } from "./migrations/1696081264702-admFieldFixing";
import { ImproveDishesEntity1696106460396 } from "./migrations/1696106460396-improveDishesEntity";
import { UserDishesEntitiesFix1696113664794 } from "./migrations/1696113664794-user_dishesEntitiesFix";
import { MessagesEntity1696440290256 } from "./migrations/1696440290256-MessagesEntity";

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
    migrations: [
      InitialMigration1696077059050,
      AdmFieldFixing1696081264702,
      ImproveDishesEntity1696106460396,
      UserDishesEntitiesFix1696113664794,
      MessagesEntity1696440290256,
    ],
  };
};

const AppDataSource = setDataSourceConfig();
export default new DataSource(AppDataSource);
