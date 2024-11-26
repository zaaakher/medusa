import { model } from "@medusajs/framework/utils"
import OrderLineItem from "./line-item"

const OrderLineItemAdjustment = model
  .define("OrderLineItemAdjustment", {
    id: model.id({ prefix: "ordliadj" }).primaryKey(),
    description: model.text().nullable(),
    promotion_id: model.text().nullable(),
    code: model.text().nullable(),
    amount: model.bigNumber(),
    provider_id: model.text().nullable(),
    item: model.belongsTo<any>(() => OrderLineItem, {
      mappedBy: "adjustments",
    }),
  })
  .indexes([
    {
      name: "ItemIdIndex",
      on: ["item_id"],
      unique: false,
    },
  ])

export default OrderLineItemAdjustment
