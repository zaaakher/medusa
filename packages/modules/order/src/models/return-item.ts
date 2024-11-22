import { model } from "@medusajs/framework/utils"
import OrderLineItem from "./line-item"
import Return from "./return"
import ReturnReason from "./return-reason"

const ReturnIdIndex = "IDX_return_item_return_id"
const ReturnReasonIdIndex = "IDX_return_item_reason_id"
const ItemIdIndex = "IDX_return_item_item_id"
const DeletedAtIndex = "IDX_return_item_deleted_at"

const ReturnItem = model
  .define("ReturnItem", {
    id: model.id({ prefix: "retitem" }).primaryKey(),
    reason: model
      .belongsTo(() => ReturnReason, {
        mappedBy: "return_items",
      })
      .nullable(),
    quantity: model.bigNumber(),
    raw_quantity: model.json(),
    received_quantity: model.bigNumber().default(0),
    raw_received_quantity: model.json(),
    damaged_quantity: model.bigNumber().default(0),
    raw_damaged_quantity: model.json(),
    return: model.belongsTo(() => Return, {
      mappedBy: "return_items",
    }),
    item: model.belongsTo(() => OrderLineItem, {
      mappedBy: "return_items",
    }),
    note: model.text().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: ReturnIdIndex,
      on: ["return_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ReturnReasonIdIndex,
      on: ["reason_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ItemIdIndex,
      on: ["item_id"],
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

export default ReturnItem
