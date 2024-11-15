import { Migration } from '@mikro-orm/migrations';

export class Migration20241115084742 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "product_images" add column "rank" integer default 0 not null;')
  }

  async down(): Promise<void> {
    this.addSql('alter table "product_images" drop column "rank";')
  }
}
