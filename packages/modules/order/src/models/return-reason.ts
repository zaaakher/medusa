import { model } from "@medusajs/framework/utils"
import { ReturnItem } from "./return-item"

const _ReturnReason = model
  .define("ReturnReason", {
    id: model.id({ prefix: "rr" }).primaryKey(),
    value: model.text().searchable(),
    label: model.text().searchable(),
    description: model.text().nullable(),
    parent_return_reason_id: model.text().nullable(),
    parent_return_reason: model.belongsTo<() => typeof _ReturnReason>(
      () => _ReturnReason,
      {
        mappedBy: "return_reason_children",
      }
    ),
    return_reason_children: model.hasMany<() => typeof _ReturnReason>(
      () => _ReturnReason,
      {
        mappedBy: "parent_return_reason",
      }
    ),
    return_items: model.hasMany<() => typeof ReturnItem>(() => ReturnItem, {
      mappedBy: "reason",
    }),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: "IDX_return_reason_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_reason_value",
      on: ["value"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_return_reason_parent_return_reason_id",
      on: ["parent_return_reason_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export const ReturnReason = _ReturnReason
