import dataSource from "../data-source";
import { Dish } from "../entities/dishes.entity";
import { User } from "../entities/users.entity";
import { User_dish } from "../entities/users_dishes.entity";
import AppError from "../errors";
import { TDish } from "../interfaces/dishes.interface";

export const createDishService = async (
  dishInfo: Omit<TDish, "id">,
  userInfo: string
): Promise<TDish> => {
    const dishRepository = dataSource.getRepository(Dish);
  const userRepository = dataSource.getRepository(User);
  const userDishRepository = dataSource.getRepository(User_dish);

  const dishExists = await dishRepository.findOneBy({ name: dishInfo.name });

  if (dishExists) {
    throw new AppError("Dish already exists", 409);
  }

  const foundUser = await userRepository.findOneBy({ id: userInfo });

  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const newDish = dishRepository.create(dishInfo);

  await dishRepository.save(newDish);

  const userDish = userDishRepository.create({
    user: foundUser,
    dishes: newDish,
  });

  await userDishRepository.save(userDish);

  return newDish;
};

export const getDishService = async(dishId) => {
const dishRepository = dataSource.getRepository(Dish)

const foundDish = dishRepository.findOneBy({id:dishId})
if(!foundDish){
  throw new AppError("Dish not found", 404)
}

return foundDish
}