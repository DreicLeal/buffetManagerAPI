import dataSource from "../data-source";
import { Dish } from "../entities/dishes.entity";
import { Message } from "../entities/messages.entity";
import { User } from "../entities/users.entity";
import { User_dish } from "../entities/users_dishes.entity";
import AppError from "../errors";
import { TUser, TUserLogin } from "../interfaces/user.interface";
import { userReturnSchema } from "../schemas/user.schema";

export const createUserService = async (
  userInfo: TUserLogin
): Promise<TUser> => {
  const userRepository = dataSource.getRepository(User);
  const userExists = await userRepository.findOneBy({ name: userInfo.name });

  if (userExists) {
    throw new AppError(
      "User Already registered, try with new credentials",
      409
    );
  }

  const newUser = userRepository.create(userInfo);
  await userRepository.save(newUser);

  const userResponse = userReturnSchema.parse(newUser);

  return userResponse;
};

export const getUserService = async (userId: string) => {
  const userRepository = dataSource.getRepository(User);
  const userFound = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      dishes: true,
      messages:true,
    },
  });

  const userDishIds = userFound.dishes.map((userDish) => userDish.id);

  const userDishRepository = dataSource.getRepository(User_dish);

  const dishesId = await userDishRepository
    .createQueryBuilder("user_dish")
    .whereInIds(userDishIds)
    .select("user_dish.dishesId", "dishId")
    .getRawMany();

  const dishIdArr = dishesId.map((row) => row.dishId);

  const dishesRepository = dataSource.getRepository(Dish);

  const dishes = await dishesRepository
    .createQueryBuilder("dish")
    .whereInIds(dishIdArr)
    .select(["id", "name", "level", "category", "extra"])
    .getRawMany();

  if (!userFound) {
    throw new AppError("User not found", 404);
  }
  const userResponse = userReturnSchema.parse({
    id: userFound.id,
    name: userFound.name,
    dishes:
     dishes.map((dish) => ({
      id: dish.id,
      name: dish.name,
      level: dish.level,
      extra: dish.extra,
      category: dish.category,
    })),
    messages:userFound.messages
  });

  return userResponse;
};
