import { model } from "@medusajs/framework/utils"
import OrderShippingMethod from "./shipping-method"

const OrderShippingMethodAdjustment = model
  .define("OrderShippingMethodAdjustment", {
    id: model.id({ prefix: "ordsmadj" }).primaryKey(),
    description: model.text().nullable(),
    promotion_id: model.text().nullable(),
    code: model.text().nullable(),
    amount: model.bigNumber(),
    raw_amount: model.json(),
    provider_id: model.text().nullable(),
    shipping_method: model.belongsTo(() => OrderShippingMethod, {
      mappedBy: "adjustments",
    }),
    shipping_method_id: model.text(),
  })
  .indexes([
    {
      name: "IDX_order_shipping_method_adjustment_shipping_method_id",
      on: ["shipping_method_id"],
      unique: false,
    },
  ])

export default OrderShippingMethodAdjustment
