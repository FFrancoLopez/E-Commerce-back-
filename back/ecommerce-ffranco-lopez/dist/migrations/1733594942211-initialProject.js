"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialProject1733594942211 = void 0;
class InitialProject1733594942211 {
    constructor() {
        this.name = 'InitialProject1733594942211';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "productsId" uuid, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying DEFAULT 'default-image-url', CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" bigint, "country" character varying(50), "address" text, "city" character varying(50), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_order_details" ("productsId" uuid NOT NULL, "orderDetailsId" uuid NOT NULL, CONSTRAINT "PK_6e479078724c7021a8460d36ad7" PRIMARY KEY ("productsId", "orderDetailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f6e6c7ee1d7f3a557ba8f599ce" ON "products_order_details_order_details" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d01089028de42dd7afc853101b" ON "products_order_details_order_details" ("orderDetailsId") `);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_a342330beee0692348a079aa13a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_order_details" ADD CONSTRAINT "FK_f6e6c7ee1d7f3a557ba8f599ced" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_order_details" ADD CONSTRAINT "FK_d01089028de42dd7afc853101bb" FOREIGN KEY ("orderDetailsId") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "products_order_details_order_details" DROP CONSTRAINT "FK_d01089028de42dd7afc853101bb"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_order_details" DROP CONSTRAINT "FK_f6e6c7ee1d7f3a557ba8f599ced"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_a342330beee0692348a079aa13a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d01089028de42dd7afc853101b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6e6c7ee1d7f3a557ba8f599ce"`);
        await queryRunner.query(`DROP TABLE "products_order_details_order_details"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
exports.InitialProject1733594942211 = InitialProject1733594942211;
//# sourceMappingURL=1733594942211-initialProject.js.map