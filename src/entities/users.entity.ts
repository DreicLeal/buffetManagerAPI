import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { User_dish } from "./users_dishes.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: false })
  is_adm: boolean;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }

  @OneToMany(() => User_dish, (dishes) => dishes.user)
  dishes: User_dish[];
}
