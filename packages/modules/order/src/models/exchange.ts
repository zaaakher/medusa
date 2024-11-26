import { model } from "@medusajs/framework/utils"
import { OrderChange, OrderExchangeItem, OrderTransaction } from "@models"
import Order from "./order"
import OrderShipping from "./order-shipping-method"
import Return from "./return"

const OrderExchange = model
  .define("OrderExchange", {
    id: model.id({ prefix: "oexc" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "exchanges",
    }),
    return_id: model.text().nullable(),
    return: model.hasMany(() => Return, {
      mappedBy: "exchange",
    }),
    order_version: model.number(),
    display_id: model.autoincrement(),
    no_notification: model.boolean().nullable(),
    difference_due: model.bigNumber().nullable(),
    allow_backorder: model.boolean().default(false),
    additional_items: model.hasMany(() => OrderExchangeItem, {
      mappedBy: "exchange",
    }),
    shipping_methods: model.hasMany(() => OrderShipping, {
      mappedBy: "exchange",
    }),
    transactions: model.hasMany(() => OrderTransaction, {
      mappedBy: "exchange",
    }),
    changes: model.hasMany(() => OrderChange),
    created_by: model.text().nullable(),
    metadata: model.json().nullable(),
    canceled_at: model.dateTime().nullable(),
  })
  .indexes([
    {
      name: "IDX_order_exchange_display_id",
      on: ["display_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_exchange_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_exchange_order_id",
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_exchange_return_id",
      on: ["return_id"],
      unique: false,
      where: "return_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
  ])

export default OrderExchange
