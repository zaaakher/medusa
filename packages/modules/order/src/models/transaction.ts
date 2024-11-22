import { model } from "@medusajs/framework/utils"

const OrderTransaction = model
  .define("OrderTransaction", {
    id: model.id({ prefix: "ordtrx" }).primaryKey(),
    order_id: model.text(),
    order: model.belongsTo(() => "Order", {
      mappedBy: "transactions",
    }),
    return_id: model.text().nullable(),
    return: model.belongsTo(() => "Return", {
      mappedBy: "transactions",
    }),
    exchange_id: model.text().nullable(),
    exchange: model.belongsTo(() => "Exchange", {
      mappedBy: "transactions",
    }),
    claim_id: model.text().nullable(),
    claim: model.belongsTo(() => "Claim", {
      mappedBy: "transactions",
    }),
    version: model.number().default(1),
    amount: model.bigNumber(),
    raw_amount: model.json(),
    currency_code: model.text(),
    reference: model.text().nullable(),
    reference_id: model.text().nullable(),
  })
  .indexes([
    {
      name: "ReferenceIdIndex",
      on: ["reference_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "OrderIdIndex",
      on: ["order_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "ReturnIdIndex",
      on: ["return_id"],
      unique: false,
      where: "return_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "ExchangeIdIndex",
      on: ["exchange_id"],
      unique: false,
      where: "exchange_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "ClaimIdIndex",
      on: ["claim_id"],
      unique: false,
      where: "claim_id IS NOT NULL AND deleted_at IS NOT NULL",
    },
    {
      name: "CurrencyCodeIndex",
      on: ["currency_code"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "DeletedAtIndex",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "OrderIdVersionIndex",
      on: ["order_id", "version"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderTransaction
