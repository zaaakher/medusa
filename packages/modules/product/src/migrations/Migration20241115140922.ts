import { Migration } from '@mikro-orm/migrations';

export class Migration20241115140922 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "product_images" drop constraint if exists "product_images_product_id_foreign";');
    this.addSql('alter table if exists "product_images" drop constraint if exists "product_images_image_id_foreign";');

    this.addSql('alter table if exists "product_images" add column if not exists "rank" integer not null;');
    this.addSql('alter table if exists "product_images" alter column "product_id" type text using ("product_id"::text);');
    this.addSql('alter table if exists "product_images" alter column "product_id" drop not null;');
    this.addSql('alter table if exists "product_images" alter column "image_id" type text using ("image_id"::text);');
    this.addSql('alter table if exists "product_images" alter column "image_id" drop not null;');
    this.addSql('alter table if exists "product_images" add constraint "product_images_product_id_foreign" foreign key ("product_id") references "product" ("id") on delete cascade;');
    this.addSql('alter table if exists "product_images" add constraint "product_images_image_id_foreign" foreign key ("image_id") references "image" ("id") on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "product_images" drop constraint if exists "product_images_product_id_foreign";');
    this.addSql('alter table if exists "product_images" drop constraint if exists "product_images_image_id_foreign";');

    this.addSql('alter table if exists "product_images" alter column "product_id" type text using ("product_id"::text);');
    this.addSql('alter table if exists "product_images" alter column "product_id" set not null;');
    this.addSql('alter table if exists "product_images" alter column "image_id" type text using ("image_id"::text);');
    this.addSql('alter table if exists "product_images" alter column "image_id" set not null;');
    this.addSql('alter table if exists "product_images" drop column if exists "rank";');
    this.addSql('alter table if exists "product_images" add constraint "product_images_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade on delete cascade;');
    this.addSql('alter table if exists "product_images" add constraint "product_images_image_id_foreign" foreign key ("image_id") references "image" ("id") on update cascade on delete cascade;');
  }

}
