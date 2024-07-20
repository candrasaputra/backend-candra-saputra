import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTable1721462936464 implements MigrationInterface {
    name = 'InitTable1721462936464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "username" text NOT NULL, "address" text NOT NULL, "role" text NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "price" numeric NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_products" ("id" uuid NOT NULL, "qty" numeric NOT NULL, "price" numeric NOT NULL, "transaction_id" uuid, "product_id" uuid, CONSTRAINT "PK_1175a670cc10b561a47e6472485" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL, "address" text NOT NULL, "status" text NOT NULL, "shipping_fee" numeric NOT NULL, "discount" numeric NOT NULL, "total_payable" numeric NOT NULL, "user_id" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_products" ADD CONSTRAINT "FK_b22f13085f3a484980b687df106" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_products" ADD CONSTRAINT "FK_f95f27599ad766df9709876ef19" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b"`);
        await queryRunner.query(`ALTER TABLE "transaction_products" DROP CONSTRAINT "FK_f95f27599ad766df9709876ef19"`);
        await queryRunner.query(`ALTER TABLE "transaction_products" DROP CONSTRAINT "FK_b22f13085f3a484980b687df106"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_176b502c5ebd6e72cafbd9d6f70"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "transaction_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
