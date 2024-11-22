import { model } from "@medusajs/framework/utils"
import OrderShippingMethodAdjustment from "./shipping-method-adjustment"
import OrderShippingMethodTaxLine from "./shipping-method-tax-line"

const ShippingOptionIdIndex = "IDX_order_shipping_method_shipping_option_id"

const OrderShippingMethod = model
  .define("OrderShippingMethod", {
    id: model.id({ prefix: "ordsm" }).primaryKey(),
    name: model.text(),
    description: model.json().nullable(),
    amount: model.bigNumber(),
    raw_amount: model.json(),
    is_tax_inclusive: model.boolean().default(false),
    is_custom_amount: model.boolean().default(false),
    shipping_option_id: model.text().nullable(),
    data: model.json().nullable(),
    metadata: model.json().nullable(),
    tax_lines: model.hasMany(() => OrderShippingMethodTaxLine, {
      mappedBy: "shipping_method",
    }),
    adjustments: model.hasMany(() => OrderShippingMethodAdjustment, {
      mappedBy: "shipping_method",
    }),
  })
  .indexes([
    {
      name: ShippingOptionIdIndex,
      on: ["shipping_option_id"],
      unique: false,
    },
  ])

export default OrderShippingMethod
