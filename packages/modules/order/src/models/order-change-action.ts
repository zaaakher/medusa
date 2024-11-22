import { model } from "@medusajs/framework/utils"

const OrderChangeIdIndex = "IDX_order_change_action_order_change_id"
const OrderIdIndex = "IDX_order_change_action_order_id"
const ReturnIdIndex = "IDX_order_change_action_return_id"
const OrderClaimIdIndex = "IDX_order_change_action_claim_id"
const OrderExchangeIdIndex = "IDX_order_change_action_exchange_id"
const DeletedAtIndex = "IDX_order_change_action_deleted_at"
const ActionOrderingIndex = "IDX_order_change_action_ordering"

const OrderChangeAction = model
  .define("OrderChangeAction", {
    id: model.id({ prefix: "ordchact" }).primaryKey(),
    ordering: model.number(),
    order_id: model.text().nullable(),
    return_id: model.text().nullable(),
    claim_id: model.text().nullable(),
    exchange_id: model.text().nullable(),
    version: model.number().nullable(),
    order_change_id: model.text().nullable(),
    reference: model.text().nullable(),
    reference_id: model.text().nullable(),
    action: model.text(),
    details: model.json(),
    amount: model.bigNumber().nullable(),
    raw_amount: model.json().nullable(),
    internal_note: model.text().nullable(),
    applied: model.boolean().default(false),
  })
  .indexes([
    {
      name: OrderChangeIdIndex,
      on: ["order_change_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: OrderIdIndex,
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ReturnIdIndex,
      on: ["return_id"],
      unique: false,
      where: "return_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: OrderClaimIdIndex,
      on: ["claim_id"],
      unique: false,
      where: "claim_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: OrderExchangeIdIndex,
      on: ["exchange_id"],
      unique: false,
      where: "exchange_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: DeletedAtIndex,
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ActionOrderingIndex,
      on: ["ordering"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderChangeAction
