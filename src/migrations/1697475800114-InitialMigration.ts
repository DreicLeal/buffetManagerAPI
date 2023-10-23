import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1697475800114 implements MigrationInterface {
    name = 'InitialMigration1697475800114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "extra" boolean NOT NULL DEFAULT false, "timer" TIMESTAMP, "level" integer DEFAULT '4', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f4748c8e8382ad34ef517520b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_dishes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "dishesId" uuid, CONSTRAINT "PK_92e8c2cec96da931d469790f1a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "checked" boolean NOT NULL DEFAULT false, "rocket" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "password" character varying NOT NULL, "is_adm" boolean DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_dishes" ADD CONSTRAINT "FK_83718fe8cc6c56ea7508dbca64c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_dishes" ADD CONSTRAINT "FK_8157a63e62153b2665bb50ee068" FOREIGN KEY ("dishesId") REFERENCES "dishes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "user_dishes" DROP CONSTRAINT "FK_8157a63e62153b2665bb50ee068"`);
        await queryRunner.query(`ALTER TABLE "user_dishes" DROP CONSTRAINT "FK_83718fe8cc6c56ea7508dbca64c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "user_dishes"`);
        await queryRunner.query(`DROP TABLE "dishes"`);
    }

}
