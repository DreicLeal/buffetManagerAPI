import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696077059050 implements MigrationInterface {
    name = 'InitialMigration1696077059050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "plan_type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "dishesId" uuid, CONSTRAINT "PK_92e8c2cec96da931d469790f1a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "is_adm" boolean, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_dishes" ADD CONSTRAINT "FK_83718fe8cc6c56ea7508dbca64c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_dishes" ADD CONSTRAINT "FK_8157a63e62153b2665bb50ee068" FOREIGN KEY ("dishesId") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_dishes" DROP CONSTRAINT "FK_8157a63e62153b2665bb50ee068"`);
        await queryRunner.query(`ALTER TABLE "user_dishes" DROP CONSTRAINT "FK_83718fe8cc6c56ea7508dbca64c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_dishes"`);
        await queryRunner.query(`DROP TABLE "dishes"`);
    }

}
