import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./users.entity";
import { Dish } from "./dishes.entity";

@Entity("user_dishes")
export class User_dish {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.dishes, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Dish, (dishes) => dishes.users, {
    onDelete: "CASCADE",
  })
  dishes: Dish;
}
