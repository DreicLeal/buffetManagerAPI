import dataSource from "../data-source";
import { Dish } from "../entities/dishes.entity";
import { User } from "../entities/users.entity";
import { User_dish } from "../entities/users_dishes.entity";
import AppError from "../errors";
import { TDish, TDishUpdate } from "../interfaces/dishes.interface";
import { dishUpdateSchema } from "../schemas/dish.schema";

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

export const getDishService = async (dishId:string) => {
  const dishRepository = dataSource.getRepository(Dish);

  const foundDish = await dishRepository.findOneBy({ id: dishId });
  if (!foundDish) {
    throw new AppError("Dish not found", 404);
  }

  return foundDish;
};
export const getDishesService = async () => {
  const dishRepository = dataSource.getRepository(Dish);
  const allDishes = await dishRepository.find();
  if (allDishes.length === 0) {
    throw new AppError(
      "None dish registered, include some new dishes and try again",
      404
    );
  }

  return allDishes;
};

export const updateDishService = async (dishId:string, newData:TDishUpdate) => {
  const dishRepository = dataSource.getRepository(Dish);

  const foundDish = await dishRepository.findOneBy({ id: dishId });
  if (!foundDish) {
    throw new AppError("Dish not found", 404);
  }

const updatedDish = dishRepository.create({
  ...foundDish,
  ...newData
})
await dishRepository.save(updatedDish)
const returnUpdatedDish = dishUpdateSchema.parse(updatedDish)

  return returnUpdatedDish;
};

export const deleteDishService = async (dishId:string) => {
  const dishRepository = dataSource.getRepository(Dish);

  const foundDish = await dishRepository.findOneBy({ id: dishId });
  if (!foundDish) {
    throw new AppError("Dish not found", 404);
  }
  await dishRepository.remove(foundDish)

  return foundDish;
};

export const deleteAllDishesService = async () => {
  const dishRepository = dataSource.getRepository(Dish);

  const foundDishes = await dishRepository.find();
  if (foundDishes.length === 0) {
    throw new AppError("Dish not found", 404);
  }
  await dishRepository.remove(foundDishes)
};