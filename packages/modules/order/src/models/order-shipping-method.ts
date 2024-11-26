import { model } from "@medusajs/framework/utils"
import Claim from "./claim"
import Exchange from "./exchange"
import Order from "./order"
import Return from "./return"
import OrderShippingMethod from "./shipping-method"

const OrderShipping = model
  .define("OrderShipping", {
    id: model.id({ prefix: "ordspmv" }).primaryKey(),
    version: model.number(),
    order: model.belongsTo<any>(() => Order, {
      mappedBy: "shipping_methods",
    }),
    return: model
      .belongsTo<any>(() => Return, {
        mappedBy: "shipping_methods",
      })
      .nullable(),
    exchange: model
      .belongsTo<any>(() => Exchange, {
        mappedBy: "shipping_methods",
      })
      .nullable(),
    claim: model
      .belongsTo<any>(() => Claim, {
        mappedBy: "shipping_methods",
      })
      .nullable(),
    shipping_method: model.belongsTo<any>(() => OrderShippingMethod, {
      mappedBy: "shipping_methods",
    }),
  })
  .indexes([
    {
      name: "IDX_order_shipping_order_id",
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_shipping_return_id",
      on: ["return_id"],
      unique: false,
      where: "return_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_shipping_exchange_id",
      on: ["exchange_id"],
      unique: false,
      where: "exchange_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_shipping_claim_id",
      on: ["claim_id"],
      unique: false,
      where: "claim_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_shipping_version",
      on: ["version"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_shipping_shipping_method_id",
      on: ["shipping_method_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_shipping_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderShipping
