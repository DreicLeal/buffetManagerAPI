import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDishesEntitiesFix1696113664794 implements MigrationInterface {
    name = 'UserDishesEntitiesFix1696113664794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_dishes" DROP COLUMN "plan_type"`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD "updated_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD "created_at" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_dishes" ADD "plan_type" character varying NOT NULL`);
    }

}
