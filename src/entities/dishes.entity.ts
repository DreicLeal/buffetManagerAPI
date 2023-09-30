import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User_dish } from "./users_dishes.entity";

@Entity("dishes")
export class Dish {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ default: false })
  extra: boolean;

  @Column({ nullable: true, default: 4 })
  level: number;

  @CreateDateColumn({ type: "date" })
  created_at: string;

  @UpdateDateColumn({ type: "date" })
  updated_at: string;

  @OneToMany(() => User_dish, (user) => user.dishes)
  users: User_dish[];
}
