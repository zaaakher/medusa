import { model } from "@medusajs/framework/utils"

const DeletedAtIndex = "IDX_return_reason_deleted_at"
const ValueIndex = "IDX_return_reason_value"
const ParentIndex = "IDX_return_reason_parent_return_reason_id"

const ReturnReason = model
  .define("ReturnReason", {
    id: model.id({ prefix: "rr" }).primaryKey(),
    value: model.text().searchable(),
    label: model.text().searchable(),
    description: model.text().nullable(),
    parent_return_reason_id: model.text().nullable(),
    parent_return_reason: model.belongsTo(() => ReturnReason, {
      mappedBy: "return_reason_children",
    }),
    return_reason_children: model.hasMany(() => ReturnReason, {
      mappedBy: "parent_return_reason",
    }),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: DeletedAtIndex,
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ValueIndex,
      on: ["value"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ParentIndex,
      on: ["parent_return_reason_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default ReturnReason
