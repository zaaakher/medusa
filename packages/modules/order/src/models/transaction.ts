import {
  DmlEntity,
  DMLEntitySchemaBuilder,
  model,
} from "@medusajs/framework/utils"
import { OrderClaim } from "./claim"
import { OrderExchange } from "./exchange"
import { Order } from "./order"
import { Return } from "./return"

// type OrderTransactionSchema = {
//   id: PrimaryKeyModifier<string, IdProperty>
//   version: NumberProperty
//   amount: BigNumberProperty
//   currency_code: TextProperty
//   reference: NullableModifier<string, TextProperty>
//   reference_id: NullableModifier<string, TextProperty>
//   exchange: BelongsTo<typeof OrderExchange>
//   claim: BelongsTo<typeof OrderClaim>
//   return: BelongsTo<typeof Return>
//   order: BelongsTo<typeof Order>
// }

const _OrderTransaction = model
  .define("OrderTransaction", {
    id: model.id({ prefix: "ordtrx" }).primaryKey(),
    version: model.number().default(1),
    amount: model.bigNumber(),
    currency_code: model.text(),
    reference: model.text().nullable(),
    reference_id: model.text().nullable(),
    order: model.belongsTo<any>(() => Order, {
      mappedBy: "transactions",
    }),
    return: model.belongsTo<any>(() => Return, {
      mappedBy: "transactions",
    }),
    exchange: model.belongsTo<any>(() => OrderExchange, {
      mappedBy: "transactions",
    }),
    claim: model.belongsTo<any>(() => OrderClaim, {
      mappedBy: "transactions",
    }),
  })
  .indexes([
    {
      name: "IDX_order_transaction_reference_id",
      on: ["reference_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_transaction_order_id",
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_transaction_return_id",
      on: ["return_id"],
      unique: false,
      where: "return_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_transaction_exchange_id",
      on: ["exchange_id"],
      unique: false,
      where: "exchange_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_transaction_claim_id",
      on: ["claim_id"],
      unique: false,
      where: "claim_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_transaction_currency_code",
      on: ["currency_code"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_transaction_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_transaction_order_id_version",
      on: ["order_id", "version"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export const OrderTransaction = _OrderTransaction as DmlEntity<
  DMLEntitySchemaBuilder<(typeof _OrderTransaction)["schema"]>,
  "OrderTransaction"
>
