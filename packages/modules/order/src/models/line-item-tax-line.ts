import { model } from "@medusajs/framework/utils"
import OrderLineItem from "./line-item"

const OrderLineItemTaxLine = model
  .define("OrderLineItemTaxLine", {
    id: model.id({ prefix: "ordlitxl" }).primaryKey(),
    description: model.text().nullable(),
    tax_rate_id: model.text().nullable(),
    code: model.text(),
    rate: model.bigNumber(),
    provider_id: model.text().nullable(),
    item: model.belongsTo(() => OrderLineItem, {
      mappedBy: "tax_lines",
    }),
  })
  .indexes([
    {
      name: "ItemIdIndex",
      on: ["item_id"],
      unique: false,
    },
  ])

export default OrderLineItemTaxLine
