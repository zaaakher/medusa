import { model } from "@medusajs/framework/utils"

import { Order } from "./order"
import { OrderLineItem } from "./line-item"

const _OrderItem = model
  .define("OrderItem", {
    id: model.id({ prefix: "orditem" }).primaryKey(),
    version: model.number(),
    unit_price: model.bigNumber().nullable(),
    compare_at_unit_price: model.bigNumber().nullable(),
    quantity: model.bigNumber(),
    fulfilled_quantity: model.bigNumber().default(0).nullable(),
    delivered_quantity: model.bigNumber().default(0).nullable(),
    shipped_quantity: model.bigNumber().default(0).nullable(),
    return_requested_quantity: model.bigNumber().default(0).nullable(),
    return_received_quantity: model.bigNumber().default(0).nullable(),
    return_dismissed_quantity: model.bigNumber().default(0).nullable(),
    written_off_quantity: model.bigNumber().default(0).nullable(),
    metadata: model.json().nullable(),
    order: model.belongsTo<() => typeof Order>(() => Order, {
      mappedBy: "items",
    }),
    item: model.belongsTo<() => typeof OrderLineItem>(() => OrderLineItem, {
      mappedBy: "items",
    }),
  })
  .indexes([
    {
      name: "IDX_order_item_order_id",
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_item_version",
      on: ["version"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_item_item_id",
      on: ["item_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_item_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export const OrderItem = _OrderItem
