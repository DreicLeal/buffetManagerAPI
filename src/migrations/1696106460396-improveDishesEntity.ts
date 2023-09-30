import { MigrationInterface, QueryRunner } from "typeorm";

export class ImproveDishesEntity1696106460396 implements MigrationInterface {
    name = 'ImproveDishesEntity1696106460396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" ADD "extra" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "dishes" ADD "level" integer DEFAULT '4'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "dishes" DROP COLUMN "extra"`);
    }

}
