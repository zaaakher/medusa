import { model, ReturnStatus } from "@medusajs/framework/utils"
import { OrderTransaction, ReturnItem } from "@models"
import Claim from "./claim"
import Exchange from "./exchange"
import Order from "./order"
import OrderShipping from "./order-shipping-method"

const Return = model
  .define("Return", {
    id: model.id({ prefix: "return" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "returns",
    }),
    exchange: model.belongsTo(() => Exchange, {
      mappedBy: "return",
    }),
    claim: model.belongsTo(() => Claim, {
      mappedBy: "return",
    }),
    order_version: model.number(),
    display_id: model.number(),
    status: model.enum(ReturnStatus).default(ReturnStatus.OPEN),
    location_id: model.text().nullable(),
    no_notification: model.boolean().nullable(),
    refund_amount: model.bigNumber().nullable(),
    raw_refund_amount: model.json(),
    items: model.hasMany(() => ReturnItem, {
      mappedBy: "return",
    }),
    shipping_methods: model.hasMany(() => OrderShipping, {
      mappedBy: "return",
    }),
    transactions: model.hasMany(() => OrderTransaction, {
      mappedBy: "return",
    }),
    created_by: model.text().nullable(),
    metadata: model.json().nullable(),
    requested_at: model.dateTime().nullable(),
    received_at: model.dateTime().nullable(),
    canceled_at: model.dateTime().nullable(),
  })
  .indexes([
    {
      name: "IDX_return_display_id",
      on: ["display_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_order_id",
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_exchange_id",
      on: ["exchange_id"],
      unique: false,
      where: "exchange_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_claim_id",
      on: ["claim_id"],
      unique: false,
      where: "claim_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
  ])

export default Return
