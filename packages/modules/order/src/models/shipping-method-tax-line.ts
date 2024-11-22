import { model } from "@medusajs/framework/utils"
import OrderShippingMethod from "./shipping-method"

const OrderShippingMethodTaxLine = model
  .define("OrderShippingMethodTaxLine", {
    id: model.id({ prefix: "ordsmtxl" }).primaryKey(),
    description: model.text().nullable(),
    tax_rate_id: model.text().nullable(),
    code: model.text(),
    rate: model.bigNumber(),
    raw_rate: model.json(),
    provider_id: model.text().nullable(),
    shipping_method: model.belongsTo(() => OrderShippingMethod, {
      mappedBy: "tax_lines",
    }),
  })
  .indexes([
    {
      name: "IDX_order_shipping_method_tax_line_shipping_method_id",
      on: ["shipping_method_id"],
      unique: false,
    },
  ])

export default OrderShippingMethodTaxLine
