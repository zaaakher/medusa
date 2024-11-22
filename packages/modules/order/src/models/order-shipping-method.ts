import { model } from "@medusajs/framework/utils"
import Claim from "./claim"
import Exchange from "./exchange"
import Order from "./order"
import Return from "./return"
import OrderShippingMethod from "./shipping-method"

const OrderIdIndex = "IDX_order_shipping_order_id"
const ReturnIdIndex = "IDX_order_shipping_return_id"
const ExchangeIdIndex = "IDX_order_shipping_exchange_id"
const ClaimIdIndex = "IDX_order_shipping_claim_id"
const OrderVersionIndex = "IDX_order_shipping_version"
const ItemIdIndex = "IDX_order_shipping_shipping_method_id"
const DeletedAtIndex = "IDX_order_shipping_deleted_at"

const OrderShipping = model
  .define("OrderShipping", {
    id: model.id({ prefix: "ordspmv" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "shippings",
    }),
    return: model
      .belongsTo(() => Return, {
        mappedBy: "order_shippings",
      })
      .nullable(),
    exchange: model
      .belongsTo(() => Exchange, {
        mappedBy: "order_shippings",
      })
      .nullable(),
    claim: model
      .belongsTo(() => Claim, {
        mappedBy: "order_shippings",
      })
      .nullable(),
    version: model.number(),
    shipping_method: model.belongsTo(() => OrderShippingMethod, {
      mappedBy: "order_shippings",
    }),
  })
  .indexes([
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
    {
      name: ExchangeIdIndex,
      on: ["exchange_id"],
      unique: false,
      where: "exchange_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: ClaimIdIndex,
      on: ["claim_id"],
      unique: false,
      where: "claim_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: OrderVersionIndex,
      on: ["version"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ItemIdIndex,
      on: ["shipping_method_id"],
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

export default OrderShipping
