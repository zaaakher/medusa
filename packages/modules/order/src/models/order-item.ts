import { model } from "@medusajs/framework/utils"
import OrderLineItem from "./line-item"
import Order from "./order"

const OrderItem = model
  .define("OrderItem", {
    id: model.id({ prefix: "orditem" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "items",
    }),
    version: model.number(),
    item: model.belongsTo(() => OrderLineItem, {
      mappedBy: "items",
    }),
    unit_price: model.bigNumber().nullable(),
    raw_unit_price: model.json().nullable(),
    compare_at_unit_price: model.bigNumber().nullable(),
    raw_compare_at_unit_price: model.json().nullable(),
    quantity: model.bigNumber(),
    raw_quantity: model.json(),
    fulfilled_quantity: model.bigNumber().default(0),
    raw_fulfilled_quantity: model.json(),
    delivered_quantity: model.bigNumber().default(0),
    raw_delivered_quantity: model.json(),
    shipped_quantity: model.bigNumber().default(0),
    raw_shipped_quantity: model.json(),
    return_requested_quantity: model.bigNumber().default(0),
    raw_return_requested_quantity: model.json(),
    return_received_quantity: model.bigNumber().default(0),
    raw_return_received_quantity: model.json(),
    return_dismissed_quantity: model.bigNumber().default(0),
    raw_return_dismissed_quantity: model.json(),
    written_off_quantity: model.bigNumber().default(0),
    raw_written_off_quantity: model.json(),
    metadata: model.json().nullable(),
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

export default OrderItem
