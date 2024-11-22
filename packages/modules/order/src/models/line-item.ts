import { model } from "@medusajs/framework/utils"
import OrderLineItemAdjustment from "./line-item-adjustment"
import OrderLineItemTaxLine from "./line-item-tax-line"
import OrderItem from "./order-item"

const OrderLineItem = model
  .define("OrderLineItem", {
    id: model.id({ prefix: "ordli" }).primaryKey(),
    title: model.text(),
    subtitle: model.text().nullable(),
    thumbnail: model.text().nullable(),
    variant_id: model.text().nullable(),
    product_id: model.text().nullable(),
    product_title: model.text().nullable(),
    product_description: model.text().nullable(),
    product_subtitle: model.text().nullable(),
    product_type: model.text().nullable(),
    product_type_id: model.text().nullable(),
    product_collection: model.text().nullable(),
    product_handle: model.text().nullable(),
    variant_sku: model.text().nullable(),
    variant_barcode: model.text().nullable(),
    variant_title: model.text().nullable(),
    variant_option_values: model.json().nullable(),
    requires_shipping: model.boolean().default(true),
    is_discountable: model.boolean().default(true),
    is_tax_inclusive: model.boolean().default(false),
    compare_at_unit_price: model.bigNumber().nullable(),
    raw_compare_at_unit_price: model.json().nullable(),
    unit_price: model.bigNumber(),
    raw_unit_price: model.json(),
    is_custom_price: model.boolean().default(false),
    tax_lines: model.hasMany(() => OrderLineItemTaxLine, {
      mappedBy: "item",
    }),
    adjustments: model.hasMany(() => OrderLineItemAdjustment, {
      mappedBy: "item",
    }),
    metadata: model.json().nullable(),

    items: model.hasMany(() => OrderItem, {
      mappedBy: "item",
    }),
  })
  .indexes([
    {
      name: "IDX_order_line_item_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_line_item_product_id",
      on: ["product_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_line_item_product_type_id",
      on: ["product_type_id"],
      unique: false,
      where: "deleted_at IS NOT NULL AND product_type_id IS NOT NULL",
    },
    {
      name: "IDX_order_line_item_variant_id",
      on: ["variant_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderLineItem
