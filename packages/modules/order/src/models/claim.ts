import { ClaimType, model } from "@medusajs/framework/utils"
import ClaimItem from "./claim-item"
import Order from "./order"
import OrderChange from "./order-change"
import OrderShipping from "./order-shipping-method"
import Return from "./return"
import OrderTransaction from "./transaction"

const OrderClaim = model
  .define("OrderClaim", {
    id: model.id({ prefix: "claim" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "claims",
    }),
    return: model.hasMany(() => Return, {
      mappedBy: "claim",
    }),
    order_version: model.number(),
    display_id: model.number(), // TODO: auto increment
    type: model.enum(ClaimType),
    no_notification: model.boolean().nullable(),
    refund_amount: model.bigNumber().nullable(),
    additional_items: model.hasMany(() => ClaimItem, {
      mappedBy: "claim",
    }),
    claim_items: model.hasMany(() => ClaimItem, {
      mappedBy: "claim",
    }),
    shipping_methods: model.hasMany(() => OrderShipping, {
      mappedBy: "claim",
    }),
    transactions: model.hasMany(() => OrderTransaction, {
      mappedBy: "claim",
    }),
    changes: model.hasMany(() => OrderChange),
    created_by: model.text().nullable(),
    canceled_at: model.dateTime().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: "IDX_order_claim_display_id",
      on: ["display_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_claim_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_claim_order_id",
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_claim_return_id",
      on: ["return_id"],
      unique: false,
      where: "return_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
  ])

export default OrderClaim
