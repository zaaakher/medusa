import { model } from "@medusajs/framework/utils"
import { OrderLineItem } from "./line-item"
import { Return } from "./return"
import { ReturnReason } from "./return-reason"

const _ReturnItem = model
  .define("ReturnItem", {
    id: model.id({ prefix: "retitem" }).primaryKey(),
    reason: model
      .belongsTo<() => typeof ReturnReason>(() => ReturnReason, {
        mappedBy: "return_items",
      })
      .nullable(),
    quantity: model.bigNumber(),
    received_quantity: model.bigNumber().default(0),
    damaged_quantity: model.bigNumber().default(0),
    return: model.belongsTo<() => typeof Return>(() => Return, {
      mappedBy: "items",
    }),
    item: model.belongsTo<() => typeof OrderLineItem>(() => OrderLineItem, {
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

export const ReturnItem = _ReturnItem
