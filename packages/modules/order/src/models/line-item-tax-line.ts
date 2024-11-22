import { model } from "@medusajs/framework/utils"

const OrderLineItemTaxLine = model
  .define("OrderLineItemTaxLine", {
    id: model.id({ prefix: "ordlitxl" }).primaryKey(),
    description: model.text().nullable(),
    tax_rate_id: model.text().nullable(),
    code: model.text(),
    rate: model.bigNumber(),
    raw_rate: model.json(),
    provider_id: model.text().nullable(),
    item: model.belongsTo(() => "OrderLineItem", { mappedBy: "tax_lines" }),
    item_id: model.text(),
  })
  .indexes([
    {
      name: "ItemIdIndex",
      on: ["item_id"],
      unique: false,
    },
  ])

export default OrderLineItemTaxLine
