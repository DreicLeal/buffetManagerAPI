import { MigrationInterface, QueryRunner } from "typeorm";

export class AdmFieldFixing1696081264702 implements MigrationInterface {
    name = 'AdmFieldFixing1696081264702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_adm" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_adm" DROP DEFAULT`);
    }

}
