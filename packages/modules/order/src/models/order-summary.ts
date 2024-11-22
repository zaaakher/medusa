import { model } from "@medusajs/framework/utils"
import Order from "./order"

const OrderIdVersionIndex = "IDX_order_summary_order_id_version"
const DeletedAtIndex = "IDX_order_summary_deleted_at"

const OrderSummary = model
  .define("OrderSummary", {
    id: model.id({ prefix: "ordsum" }).primaryKey(),
    order: model.belongsTo(() => Order, {
      mappedBy: "summaries",
    }),
    version: model.number().default(1),
    totals: model.json(),
  })
  .indexes([
    {
      name: OrderIdVersionIndex,
      on: ["order_id", "version"],
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

export default OrderSummary
