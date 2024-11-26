import { model } from "@medusajs/framework/utils"
import { OrderLineItem } from "./line-item"

const _OrderLineItemAdjustment = model
  .define("OrderLineItemAdjustment", {
    id: model.id({ prefix: "ordliadj" }).primaryKey(),
    description: model.text().nullable(),
    promotion_id: model.text().nullable(),
    code: model.text().nullable(),
    amount: model.bigNumber(),
    provider_id: model.text().nullable(),
    item: model.belongsTo<any /* <() => typeof OrderLineItem> */>(
      () => OrderLineItem,
      {
        mappedBy: "adjustments",
      }
    ),
  })
  .indexes([
    {
      name: "ItemIdIndex",
      on: ["item_id"],
      unique: false,
    },
  ])

export const OrderLineItemAdjustment = _OrderLineItemAdjustment
