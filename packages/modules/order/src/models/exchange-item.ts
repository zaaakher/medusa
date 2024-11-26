import { model } from "@medusajs/framework/utils"
import Exchange from "./exchange"
import OrderLineItem from "./line-item"

const OrderExchangeItem = model
  .define("OrderExchangeItem", {
    id: model.id({ prefix: "oexcitem" }).primaryKey(),
    quantity: model.bigNumber(),
    exchange: model.belongsTo<any>(() => Exchange, {
      mappedBy: "additional_items",
    }),
    item: model.belongsTo<any>(() => OrderLineItem, {
      mappedBy: "exchange_items",
    }),
    note: model.text().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: "IDX_order_exchange_item_exchange_id",
      on: ["exchange_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_exchange_item_item_id",
      on: ["item_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_exchange_item_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderExchangeItem
