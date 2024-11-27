import { Migration } from "@mikro-orm/migrations"

export class Migration20241127171653 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table if exists "order_claim" drop constraint if exists "order_claim_return_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_exchange" drop constraint if exists "order_exchange_return_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_exchange_item" drop constraint if exists "order_exchange_item_exchange_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_claim_item" drop constraint if exists "order_claim_item_claim_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_line_item_adjustment" drop constraint if exists "order_line_item_adjustment_item_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_line_item_tax_line" drop constraint if exists "order_line_item_tax_line_item_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_shipping_method_adjustment" drop constraint if exists "order_shipping_method_adjustment_shipping_method_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_shipping_method_tax_line" drop constraint if exists "order_shipping_method_tax_line_shipping_method_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_summary" drop constraint if exists "order_summary_order_id_foreign";'
    )

    this.addSql(
      'alter table if exists "return" drop constraint if exists "return_exchange_id_foreign";'
    )
    this.addSql(
      'alter table if exists "return" drop constraint if exists "return_claim_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_order_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_return_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_exchange_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_claim_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_change" drop constraint if exists "order_change_status_check";'
    )

    this.addSql(
      'alter table if exists "order_change" drop constraint if exists "order_change_order_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_change_action" drop constraint if exists "order_change_action_order_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_change_action" drop constraint if exists "order_change_action_return_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_change_action" drop constraint if exists "order_change_action_claim_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_change_action" drop constraint if exists "order_change_action_exchange_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_change_action" drop constraint if exists "order_change_action_order_change_id_foreign";'
    )

    this.addSql(
      'alter table if exists "return_reason" drop constraint if exists "return_reason_parent_return_reason_id_foreign";'
    )

    this.addSql(
      'alter table if exists "return_item" drop constraint if exists "return_item_return_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_address" add column if not exists "deleted_at" timestamptz null;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_address_deleted_at" ON "order_address" (deleted_at) WHERE deleted_at IS NULL;'
    )

    this.addSql(
      'alter table if exists "order" alter column "display_id" type bigint using ("display_id"::bigint);'
    )
    this.addSql(
      'alter table if exists "order" alter column "display_id" drop not null;'
    )
    this.addSql(
      'alter table if exists "order" alter column "display_id" drop default;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_sales_channel_id" ON "order" (sales_channel_id) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'alter table if exists "order_claim" alter column "display_id" type bigint using ("display_id"::bigint);'
    )
    this.addSql(
      'alter table if exists "order_claim" drop constraint if exists "order_claim_return_id_unique";'
    )
    this.addSql(
      'alter table if exists "order_claim" alter column "display_id" drop default;'
    )

    this.addSql(
      'alter table if exists "order_exchange" alter column "display_id" type bigint using ("display_id"::bigint);'
    )
    this.addSql(
      'alter table if exists "order_exchange" drop constraint if exists "order_exchange_return_id_unique";'
    )
    this.addSql(
      'alter table if exists "order_exchange" alter column "display_id" drop default;'
    )

    this.addSql(
      'alter table if exists "order_line_item" alter column "requires_shipping" type boolean using ("requires_shipping"::boolean);'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "requires_shipping" set default true;'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "is_discountable" type boolean using ("is_discountable"::boolean);'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "is_discountable" set default true;'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "is_tax_inclusive" type boolean using ("is_tax_inclusive"::boolean);'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "is_tax_inclusive" set default false;'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "unit_price" type numeric using ("unit_price"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "unit_price" set not null;'
    )

    this.addSql(
      'alter table if exists "order_item" alter column "fulfilled_quantity" type numeric using ("fulfilled_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "fulfilled_quantity" set default 0;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "delivered_quantity" type numeric using ("delivered_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "delivered_quantity" set default 0;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "shipped_quantity" type numeric using ("shipped_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "shipped_quantity" set default 0;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_requested_quantity" type numeric using ("return_requested_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_requested_quantity" set default 0;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_received_quantity" type numeric using ("return_received_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_received_quantity" set default 0;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_dismissed_quantity" type numeric using ("return_dismissed_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_dismissed_quantity" set default 0;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "written_off_quantity" type numeric using ("written_off_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "written_off_quantity" set default 0;'
    )

    this.addSql('drop index if exists "IDX_order_claim_item_image_deleted_at";')
    this.addSql(
      'alter table if exists "order_exchange_item" add constraint "order_exchange_item_exchange_id_foreign" foreign key ("exchange_id") references "order_exchange" ("id") on update cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_exchange_item_deleted_at" ON "order_exchange_item" (deleted_at) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'alter table if exists "order_claim_item" add constraint "order_claim_item_claim_id_foreign" foreign key ("claim_id") references "order_claim" ("id") on update cascade;'
    )

    this.addSql(
      'alter table if exists "order_line_item_adjustment" add constraint "order_line_item_adjustment_item_id_foreign" foreign key ("item_id") references "order_line_item" ("id") on update cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_line_item_adjustment_deleted_at" ON "order_line_item_adjustment" (deleted_at) WHERE deleted_at IS NULL;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "ItemIdIndex" ON "order_line_item_adjustment" (item_id) WHERE deleted_at IS NULL;'
    )

    this.addSql(
      'alter table if exists "order_line_item_tax_line" alter column "item_id" type text using ("item_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_line_item_tax_line" alter column "item_id" set not null;'
    )
    this.addSql(
      'alter table if exists "order_line_item_tax_line" add constraint "order_line_item_tax_line_item_id_foreign" foreign key ("item_id") references "order_line_item" ("id") on update cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_line_item_tax_line_deleted_at" ON "order_line_item_tax_line" (deleted_at) WHERE deleted_at IS NULL;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "ItemIdIndex" ON "order_line_item_tax_line" (item_id) WHERE deleted_at IS NULL;'
    )

    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_tax_inclusive" drop default;'
    )
    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_tax_inclusive" type boolean using ("is_tax_inclusive"::boolean);'
    )
    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_custom_amount" drop default;'
    )
    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_custom_amount" type boolean using ("is_custom_amount"::boolean);'
    )

    this.addSql(
      'alter table if exists "order_shipping_method_adjustment" add constraint "order_shipping_method_adjustment_shipping_method_id_foreign" foreign key ("shipping_method_id") references "order_shipping_method" ("id") on update cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_shipping_method_adjustment_deleted_at" ON "order_shipping_method_adjustment" (deleted_at) WHERE deleted_at IS NULL;'
    )

    this.addSql(
      'alter table if exists "order_shipping_method_tax_line" add constraint "order_shipping_method_tax_line_shipping_method_id_foreign" foreign key ("shipping_method_id") references "order_shipping_method" ("id") on update cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_shipping_method_tax_line_deleted_at" ON "order_shipping_method_tax_line" (deleted_at) WHERE deleted_at IS NULL;'
    )

    this.addSql(
      'alter table if exists "order_summary" add constraint "order_summary_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_summary_order_id" ON "order_summary" (order_id) WHERE deleted_at IS NULL;'
    )

    this.addSql(
      'alter table if exists "return" alter column "exchange_id" type text using ("exchange_id"::text);'
    )
    this.addSql(
      'alter table if exists "return" alter column "exchange_id" set not null;'
    )
    this.addSql(
      'alter table if exists "return" alter column "claim_id" type text using ("claim_id"::text);'
    )
    this.addSql(
      'alter table if exists "return" alter column "claim_id" set not null;'
    )
    this.addSql(
      'alter table if exists "return" alter column "display_id" type bigint using ("display_id"::bigint);'
    )
    this.addSql(
      'alter table if exists "return" drop constraint if exists "return_exchange_id_unique";'
    )
    this.addSql(
      'alter table if exists "return" drop constraint if exists "return_claim_id_unique";'
    )
    this.addSql(
      'alter table if exists "return" alter column "display_id" drop default;'
    )
    this.addSql(
      'alter table if exists "return" add constraint "return_exchange_id_foreign" foreign key ("exchange_id") references "order_exchange" ("id") on update cascade;'
    )
    this.addSql(
      'alter table if exists "return" add constraint "return_claim_id_foreign" foreign key ("claim_id") references "order_claim" ("id") on update cascade;'
    )

    this.addSql(
      'alter table if exists "order_transaction" alter column "return_id" type text using ("return_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "return_id" set not null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "exchange_id" type text using ("exchange_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "exchange_id" set not null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "claim_id" type text using ("claim_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "claim_id" set not null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_return_id_foreign" foreign key ("return_id") references "return" ("id") on update cascade;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_exchange_id_foreign" foreign key ("exchange_id") references "order_exchange" ("id") on update cascade;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_claim_id_foreign" foreign key ("claim_id") references "order_claim" ("id") on update cascade;'
    )

    this.addSql(
      'alter table if exists "order_change" alter column "status" type text using ("status"::text);'
    )
    this.addSql(
      "alter table if exists \"order_change\" add constraint \"order_change_status_check\" check (\"status\" in ('confirmed', 'declined', 'requested', 'pending', 'canceled'));"
    )
    this.addSql(
      'alter table if exists "order_change" alter column "status" drop not null;'
    )
    this.addSql(
      'alter table if exists "order_change" alter column "created_by" type text using ("created_by"::text);'
    )
    this.addSql(
      'alter table if exists "order_change" alter column "created_by" set not null;'
    )
    this.addSql('drop index if exists "IDX_order_change_order_id_version";')
    this.addSql(
      'alter table if exists "order_change" add constraint "order_change_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_change_version" ON "order_change" (order_id, version) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'alter table if exists "order_change_action" alter column "ordering" type bigint using ("ordering"::bigint);'
    )
    this.addSql(
      'alter table if exists "order_change_action" alter column "order_change_id" type text using ("order_change_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_change_action" alter column "order_change_id" set not null;'
    )
    this.addSql(
      'alter table if exists "order_change_action" alter column "ordering" drop default;'
    )
    this.addSql(
      'alter table if exists "order_change_action" add constraint "order_change_action_order_change_id_foreign" foreign key ("order_change_id") references "order_change" ("id") on update cascade;'
    )

    this.addSql(
      'alter table if exists "return_reason" alter column "parent_return_reason_id" type text using ("parent_return_reason_id"::text);'
    )
    this.addSql(
      'alter table if exists "return_reason" alter column "parent_return_reason_id" set not null;'
    )
    this.addSql(
      'alter table if exists "return_reason" add constraint "return_reason_parent_return_reason_id_foreign" foreign key ("parent_return_reason_id") references "return_reason" ("id") on update cascade;'
    )

    this.addSql(
      'alter table if exists "return_item" add constraint "return_item_return_id_foreign" foreign key ("return_id") references "return" ("id") on update cascade;'
    )

    this.addSql(`
       ALTER TABLE "order_address"
        ADD COLUMN if NOT exists "deleted_at" timestamptz NULL;
    `)
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table if exists "order_line_item_adjustment" drop constraint if exists "order_line_item_adjustment_item_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_line_item_tax_line" drop constraint if exists "order_line_item_tax_line_item_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_shipping_method_adjustment" drop constraint if exists "order_shipping_method_adjustment_shipping_method_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_shipping_method_tax_line" drop constraint if exists "order_shipping_method_tax_line_shipping_method_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_summary" drop constraint if exists "order_summary_order_id_foreign";'
    )

    this.addSql(
      'alter table if exists "return" drop constraint if exists "return_exchange_id_foreign";'
    )
    this.addSql(
      'alter table if exists "return" drop constraint if exists "return_claim_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_exchange_item" drop constraint if exists "order_exchange_item_exchange_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_order_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_return_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_exchange_id_foreign";'
    )
    this.addSql(
      'alter table if exists "order_transaction" drop constraint if exists "order_transaction_claim_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_claim_item" drop constraint if exists "order_claim_item_claim_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_change" drop constraint if exists "order_change_status_check";'
    )

    this.addSql(
      'alter table if exists "order_change" drop constraint if exists "order_change_order_id_foreign";'
    )

    this.addSql(
      'alter table if exists "order_change_action" drop constraint if exists "order_change_action_order_change_id_foreign";'
    )

    this.addSql(
      'alter table if exists "return_reason" drop constraint if exists "return_reason_parent_return_reason_id_foreign";'
    )

    this.addSql(
      'alter table if exists "return_item" drop constraint if exists "return_item_return_id_foreign";'
    )

    this.addSql('drop index if exists "IDX_order_address_deleted_at";')
    this.addSql(
      'alter table if exists "order_address" drop column if exists "deleted_at";'
    )

    this.addSql(
      'alter table if exists "order" alter column "display_id" type int using ("display_id"::int);'
    )
    this.addSql(
      'alter table if exists "order" alter column "display_id" set not null;'
    )
    this.addSql('drop index if exists "IDX_order_sales_channel_id";')
    this.addSql('create sequence if not exists "order_display_id_seq";')
    this.addSql(
      'select setval(\'order_display_id_seq\', (select max("display_id") from "order"));'
    )
    this.addSql(
      'alter table if exists "order" alter column "display_id" set default nextval(\'order_display_id_seq\');'
    )

    this.addSql(
      'alter table if exists "order_line_item" alter column "is_tax_inclusive" drop default;'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "is_tax_inclusive" type boolean using ("is_tax_inclusive"::boolean);'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "unit_price" type numeric using ("unit_price"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_line_item" alter column "unit_price" drop not null;'
    )

    this.addSql(
      'alter table if exists "order_item" alter column "fulfilled_quantity" drop default;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "fulfilled_quantity" type numeric using ("fulfilled_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "delivered_quantity" drop default;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "delivered_quantity" type numeric using ("delivered_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "shipped_quantity" drop default;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "shipped_quantity" type numeric using ("shipped_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_requested_quantity" drop default;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_requested_quantity" type numeric using ("return_requested_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_received_quantity" drop default;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_received_quantity" type numeric using ("return_received_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_dismissed_quantity" drop default;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "return_dismissed_quantity" type numeric using ("return_dismissed_quantity"::numeric);'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "written_off_quantity" drop default;'
    )
    this.addSql(
      'alter table if exists "order_item" alter column "written_off_quantity" type numeric using ("written_off_quantity"::numeric);'
    )

    this.addSql(
      'drop index if exists "IDX_order_line_item_adjustment_deleted_at";'
    )
    this.addSql('drop index if exists "ItemIdIndex";')
    this.addSql(
      'alter table if exists "order_line_item_adjustment" add constraint "order_line_item_adjustment_item_id_foreign" foreign key ("item_id") references "order_line_item" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table if exists "order_line_item_tax_line" alter column "item_id" type text using ("item_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_line_item_tax_line" alter column "item_id" drop not null;'
    )
    this.addSql(
      'drop index if exists "IDX_order_line_item_tax_line_deleted_at";'
    )
    this.addSql('drop index if exists "ItemIdIndex";')
    this.addSql(
      'alter table if exists "order_line_item_tax_line" add constraint "order_line_item_tax_line_item_id_foreign" foreign key ("item_id") references "order_line_item" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_tax_inclusive" type boolean using ("is_tax_inclusive"::boolean);'
    )
    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_tax_inclusive" set default false;'
    )
    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_custom_amount" type boolean using ("is_custom_amount"::boolean);'
    )
    this.addSql(
      'alter table if exists "order_shipping_method" alter column "is_custom_amount" set default false;'
    )

    this.addSql(
      'drop index if exists "IDX_order_shipping_method_adjustment_deleted_at";'
    )
    this.addSql(
      'alter table if exists "order_shipping_method_adjustment" add constraint "order_shipping_method_adjustment_shipping_method_id_foreign" foreign key ("shipping_method_id") references "order_shipping_method" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'drop index if exists "IDX_order_shipping_method_tax_line_deleted_at";'
    )
    this.addSql(
      'alter table if exists "order_shipping_method_tax_line" add constraint "order_shipping_method_tax_line_shipping_method_id_foreign" foreign key ("shipping_method_id") references "order_shipping_method" ("id") on update cascade on delete cascade;'
    )

    this.addSql('drop index if exists "IDX_order_summary_order_id";')
    this.addSql(
      'alter table if exists "order_summary" add constraint "order_summary_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table if exists "return" alter column "display_id" type int using ("display_id"::int);'
    )
    this.addSql(
      'alter table if exists "return" alter column "exchange_id" type text using ("exchange_id"::text);'
    )
    this.addSql(
      'alter table if exists "return" alter column "exchange_id" drop not null;'
    )
    this.addSql(
      'alter table if exists "return" alter column "claim_id" type text using ("claim_id"::text);'
    )
    this.addSql(
      'alter table if exists "return" alter column "claim_id" drop not null;'
    )
    this.addSql('create sequence if not exists "return_display_id_seq";')
    this.addSql(
      'select setval(\'return_display_id_seq\', (select max("display_id") from "return"));'
    )
    this.addSql(
      'alter table if exists "return" alter column "display_id" set default nextval(\'return_display_id_seq\');'
    )
    this.addSql(
      'alter table if exists "return" add constraint "return_exchange_id_foreign" foreign key ("exchange_id") references "order_exchange" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "return" add constraint "return_claim_id_foreign" foreign key ("claim_id") references "order_claim" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "return" add constraint "return_exchange_id_unique" unique ("exchange_id");'
    )
    this.addSql(
      'alter table if exists "return" add constraint "return_claim_id_unique" unique ("claim_id");'
    )

    this.addSql(
      'alter table if exists "order_exchange" alter column "display_id" type int using ("display_id"::int);'
    )
    this.addSql(
      'create sequence if not exists "order_exchange_display_id_seq";'
    )
    this.addSql(
      'select setval(\'order_exchange_display_id_seq\', (select max("display_id") from "order_exchange"));'
    )
    this.addSql(
      'alter table if exists "order_exchange" alter column "display_id" set default nextval(\'order_exchange_display_id_seq\');'
    )
    this.addSql(
      'alter table if exists "order_exchange" add constraint "order_exchange_return_id_foreign" foreign key ("return_id") references "return" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "order_exchange" add constraint "order_exchange_return_id_unique" unique ("return_id");'
    )

    this.addSql('drop index if exists "IDX_order_exchange_item_deleted_at";')
    this.addSql(
      'alter table if exists "order_exchange_item" add constraint "order_exchange_item_exchange_id_foreign" foreign key ("exchange_id") references "order_exchange" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_claim_item_image_deleted_at" ON "order_claim_item_image" (deleted_at) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'alter table if exists "order_claim" alter column "display_id" type int using ("display_id"::int);'
    )
    this.addSql('create sequence if not exists "order_claim_display_id_seq";')
    this.addSql(
      'select setval(\'order_claim_display_id_seq\', (select max("display_id") from "order_claim"));'
    )
    this.addSql(
      'alter table if exists "order_claim" alter column "display_id" set default nextval(\'order_claim_display_id_seq\');'
    )
    this.addSql(
      'alter table if exists "order_claim" add constraint "order_claim_return_id_foreign" foreign key ("return_id") references "return" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "order_claim" add constraint "order_claim_return_id_unique" unique ("return_id");'
    )

    this.addSql(
      'alter table if exists "order_transaction" alter column "return_id" type text using ("return_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "return_id" drop not null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "exchange_id" type text using ("exchange_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "exchange_id" drop not null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "claim_id" type text using ("claim_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_transaction" alter column "claim_id" drop not null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_return_id_foreign" foreign key ("return_id") references "return" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_exchange_id_foreign" foreign key ("exchange_id") references "order_exchange" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "order_transaction" add constraint "order_transaction_claim_id_foreign" foreign key ("claim_id") references "order_claim" ("id") on update cascade on delete set null;'
    )

    this.addSql(
      'alter table if exists "order_claim_item" add constraint "order_claim_item_claim_id_foreign" foreign key ("claim_id") references "order_claim" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table if exists "order_change" alter column "status" type text using ("status"::text);'
    )
    this.addSql(
      "alter table if exists \"order_change\" add constraint \"order_change_status_check\" check (\"status\" in ('confirmed', 'declined', 'requested', 'pending', 'canceled'));"
    )
    this.addSql(
      'alter table if exists "order_change" alter column "status" set not null;'
    )
    this.addSql(
      'alter table if exists "order_change" alter column "created_by" type text using ("created_by"::text);'
    )
    this.addSql(
      'alter table if exists "order_change" alter column "created_by" drop not null;'
    )
    this.addSql('drop index if exists "IDX_order_change_version";')
    this.addSql(
      'alter table if exists "order_change" add constraint "order_change_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'CREATE INDEX IF NOT EXISTS "IDX_order_change_order_id_version" ON "order_change" (order_id, version) WHERE deleted_at IS NOT NULL;'
    )

    this.addSql(
      'alter table if exists "order_change_action" alter column "ordering" type integer using ("ordering"::integer);'
    )
    this.addSql(
      'alter table if exists "order_change_action" alter column "order_change_id" type text using ("order_change_id"::text);'
    )
    this.addSql(
      'alter table if exists "order_change_action" alter column "order_change_id" drop not null;'
    )
    this.addSql(
      'create sequence if not exists "order_change_action_ordering_seq";'
    )
    this.addSql(
      'select setval(\'order_change_action_ordering_seq\', (select max("ordering") from "order_change_action"));'
    )
    this.addSql(
      'alter table if exists "order_change_action" alter column "ordering" set default nextval(\'order_change_action_ordering_seq\');'
    )
    this.addSql(
      'alter table if exists "order_change_action" add constraint "order_change_action_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade on delete cascade;'
    )
    this.addSql(
      'alter table if exists "order_change_action" add constraint "order_change_action_return_id_foreign" foreign key ("return_id") references "return" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "order_change_action" add constraint "order_change_action_claim_id_foreign" foreign key ("claim_id") references "order_claim" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "order_change_action" add constraint "order_change_action_exchange_id_foreign" foreign key ("exchange_id") references "order_exchange" ("id") on update cascade on delete set null;'
    )
    this.addSql(
      'alter table if exists "order_change_action" add constraint "order_change_action_order_change_id_foreign" foreign key ("order_change_id") references "order_change" ("id") on update cascade on delete cascade;'
    )

    this.addSql(
      'alter table if exists "return_reason" alter column "parent_return_reason_id" type text using ("parent_return_reason_id"::text);'
    )
    this.addSql(
      'alter table if exists "return_reason" alter column "parent_return_reason_id" drop not null;'
    )
    this.addSql(
      'alter table if exists "return_reason" add constraint "return_reason_parent_return_reason_id_foreign" foreign key ("parent_return_reason_id") references "return_reason" ("id") on update cascade on delete set null;'
    )

    this.addSql(
      'alter table if exists "return_item" add constraint "return_item_return_id_foreign" foreign key ("return_id") references "return" ("id") on update cascade on delete cascade;'
    )

    this.addSql(`
       ALTER TABLE "order_address" DROP COLUMN if exists "deleted_at";
    `)
  }
}
