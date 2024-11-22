import { model } from "@medusajs/framework/utils"
import Exchange from "./exchange"
import OrderLineItem from "./line-item"

const ExchangeIdIndex = "IDX_order_exchange_item_exchange_id"
const ItemIdIndex = "IDX_order_exchange_item_item_id"
const DeletedAtIndex = "IDX_order_exchange_item_deleted_at"

const OrderExchangeItem = model
  .define("OrderExchangeItem", {
    id: model.id({ prefix: "oexcitem" }).primaryKey(),
    quantity: model.bigNumber(),
    raw_quantity: model.json(),
    exchange: model.belongsTo(() => Exchange, {
      mappedBy: "items",
    }),
    item: model.belongsTo(() => OrderLineItem, {
      mappedBy: "items",
    }),
    note: model.text().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: ExchangeIdIndex,
      on: ["exchange_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ItemIdIndex,
      on: ["item_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: DeletedAtIndex,
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderExchangeItem
