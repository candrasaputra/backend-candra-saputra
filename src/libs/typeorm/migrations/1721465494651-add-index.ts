import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndex1721465494651 implements MigrationInterface {
    name = 'AddIndex1721465494651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_718dfbc007ec098cfa28295ca7" ON "products" ("deleted_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_718dfbc007ec098cfa28295ca7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
    }

}
