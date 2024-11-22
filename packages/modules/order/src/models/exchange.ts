import { model } from "@medusajs/framework/utils"
import { OrderExchangeItem, OrderTransaction } from "@models"
import Order from "./order"
import OrderShipping from "./order-shipping-method"
import Return from "./return"

const DisplayIdIndex = "IDX_order_exchange_display_id"
const OrderExchangeDeletedAtIndex = "IDX_order_exchange_deleted_at"
const OrderIdIndex = "IDX_order_exchange_order_id"
const ReturnIdIndex = "IDX_order_exchange_return_id"

const OrderExchange = model
  .define("OrderExchange", {
    id: model.id({ prefix: "oexc" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "exchanges",
    }),
    return: model
      .belongsTo(() => Return, {
        mappedBy: "exchange",
      })
      .nullable(),
    order_version: model.number(),
    display_id: model.number(),
    no_notification: model.boolean().nullable(),
    difference_due: model.bigNumber().nullable(),
    raw_difference_due: model.json(),
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
    created_by: model.text().nullable(),
    metadata: model.json().nullable(),
    canceled_at: model.dateTime().nullable(),
  })
  .indexes([
    {
      name: DisplayIdIndex,
      on: ["display_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: OrderExchangeDeletedAtIndex,
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: OrderIdIndex,
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ReturnIdIndex,
      on: ["return_id"],
      unique: false,
      where: "return_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
  ])

export default OrderExchange
