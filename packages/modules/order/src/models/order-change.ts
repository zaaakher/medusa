import { model, OrderChangeStatus } from "@medusajs/framework/utils"
import OrderClaim from "./claim"
import OrderExchange from "./exchange"
import Order from "./order"
import OrderChangeAction from "./order-change-action"
import Return from "./return"

const OrderIdIndex = "IDX_order_change_order_id"
const ReturnIdIndex = "IDX_order_change_return_id"
const OrderClaimIdIndex = "IDX_order_change_claim_id"
const OrderExchangeIdIndex = "IDX_order_change_exchange_id"
const OrderChangeStatusIndex = "IDX_order_change_status"
const DeletedAtIndex = "IDX_order_change_deleted_at"
const VersionIndex = "IDX_order_change_version"

const OrderChange = model
  .define("OrderChange", {
    id: model.id({ prefix: "ordch" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "changes",
    }),
    return: model
      .belongsTo(() => Return, {
        mappedBy: "order_changes",
      })
      .nullable(),
    claim: model
      .belongsTo(() => OrderClaim, {
        mappedBy: "order_changes",
      })
      .nullable(),
    exchange: model
      .belongsTo(() => OrderExchange, {
        mappedBy: "order_changes",
      })
      .nullable(),
    version: model.number(),
    change_type: model.text().nullable(),
    actions: model.hasMany(() => OrderChangeAction, {
      mappedBy: "order_change",
    }),
    description: model.text().nullable(),
    status: model.enum(OrderChangeStatus).default(OrderChangeStatus.PENDING),
    internal_note: model.text().nullable(),
    created_by: model.text(),
    requested_by: model.text().nullable(),
    requested_at: model.dateTime().nullable(),
    confirmed_by: model.text().nullable(),
    confirmed_at: model.dateTime().nullable(),
    declined_by: model.text().nullable(),
    declined_reason: model.text().nullable(),
    metadata: model.json().nullable(),
    declined_at: model.dateTime().nullable(),
    canceled_by: model.text().nullable(),
    canceled_at: model.dateTime().nullable(),
  })
  .indexes([
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
      name: OrderChangeStatusIndex,
      on: ["status"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: DeletedAtIndex,
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: VersionIndex,
      on: ["order_id", "version"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderChange
