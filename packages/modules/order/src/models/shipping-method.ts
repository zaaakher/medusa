import { model } from "@medusajs/framework/utils"
import { OrderShipping } from "./order-shipping-method"
import { OrderShippingMethodTaxLine } from "./shipping-method-tax-line"
import { OrderShippingMethodAdjustment } from "./shipping-method-adjustment"

const _OrderShippingMethod = model
  .define("OrderShippingMethod", {
    id: model.id({ prefix: "ordsm" }).primaryKey(),
    name: model.text(),
    description: model.json().nullable(),
    amount: model.bigNumber(),
    is_tax_inclusive: model.boolean().default(false).nullable(),
    is_custom_amount: model.boolean().default(false).nullable(),
    shipping_option_id: model.text().nullable(),
    data: model.json().nullable(),
    metadata: model.json().nullable(),
    tax_lines: model.hasMany<() => typeof OrderShippingMethodTaxLine>(
      () => OrderShippingMethodTaxLine,
      {
        mappedBy: "shipping_method",
      }
    ),
    adjustments: model.hasMany<() => typeof OrderShippingMethodAdjustment>(
      () => OrderShippingMethodAdjustment,
      {
        mappedBy: "shipping_method",
      }
    ),
    shipping_methods: model.hasMany<() => typeof OrderShipping>(
      () => OrderShipping,
      {
        mappedBy: "shipping_method",
      }
    ),
  })
  .indexes([
    {
      name: "IDX_order_shipping_method_shipping_option_id",
      on: ["shipping_option_id"],
      unique: false,
    },
  ])

export const OrderShippingMethod = _OrderShippingMethod
