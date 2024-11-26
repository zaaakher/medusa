import { model } from "@medusajs/framework/utils"
import OrderLineItem from "./line-item"
import Return from "./return"
import ReturnReason from "./return-reason"

const ReturnItem = model
  .define("ReturnItem", {
    id: model.id({ prefix: "retitem" }).primaryKey(),
    reason: model
      .belongsTo<any>(() => ReturnReason, {
        mappedBy: "return_items",
      })
      .nullable(),
    quantity: model.bigNumber(),
    received_quantity: model.bigNumber().default(0),
    damaged_quantity: model.bigNumber().default(0),
    return: model.belongsTo<any>(() => Return, {
      mappedBy: "items",
    }),
    item: model.belongsTo<any>(() => OrderLineItem, {
      mappedBy: "return_items",
    }),
    note: model.text().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: "IDX_return_item_return_id",
      on: ["return_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_item_reason_id",
      on: ["reason_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_item_item_id",
      on: ["item_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_item_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default ReturnItem
