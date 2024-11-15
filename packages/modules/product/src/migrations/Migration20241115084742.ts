import { Migration } from '@mikro-orm/migrations';

export class Migration20241115084742 extends Migration {
  async up(): Promise<void> {
    this.addSql('ALTER TABLE "product_images" ADD COLUMN "rank" integer DEFAULT 0 NOT NULL;')
  }

  async down(): Promise<void> {
    this.addSql('ALTER TABLE "product_images" DROP COLUMN "rank";')
  }
}
