import { model, OrderStatus } from "@medusajs/framework/utils"
import { OrderAddress } from "./address"
import { OrderClaim } from "./claim"
import { OrderExchange } from "./exchange"
import { OrderChange } from "./order-change"
import { OrderItem } from "./order-item"
import { OrderShipping } from "./order-shipping-method"
import { OrderSummary } from "./order-summary"
import { Return } from "./return"
import { OrderTransaction } from "./transaction"

const _Order = model
  .define("Order", {
    id: model.id({ prefix: "order" }).primaryKey(),
    display_id: model.autoincrement(),
    region_id: model.text().nullable(),
    customer_id: model.text().nullable(),
    version: model.number().default(1),
    sales_channel_id: model.text().nullable(),
    status: model.enum(OrderStatus).default(OrderStatus.PENDING),
    is_draft_order: model.boolean().default(false),
    email: model.text().searchable().nullable(),
    currency_code: model.text(),
    shipping_address: model.belongsTo<any /* <() => typeof OrderAddress> */>(
      () => OrderAddress
    ),
    billing_address: model.belongsTo<any /* <() => typeof OrderAddress> */>(
      () => OrderAddress
    ),
    no_notification: model.boolean().nullable(),
    metadata: model.json().nullable(),
    summary: model.hasMany<any /* <() => typeof OrderSummary> */>(
      () => OrderSummary,
      {
        mappedBy: "order",
      }
    ),
    items: model.hasMany<any /* <() => typeof OrderItem> */>(() => OrderItem, {
      mappedBy: "order",
    }),
    shipping_methods: model.hasMany<any /* <() => typeof OrderShipping> */>(
      () => OrderShipping,
      {
        mappedBy: "order",
      }
    ),
    transactions: model.hasMany<any /* <() => typeof OrderTransaction> */>(
      () => OrderTransaction,
      {
        mappedBy: "order",
      }
    ),
    canceled_at: model.dateTime().nullable(),

    exchanges: model.hasMany<any /* <() => typeof OrderExchange> */>(
      () => OrderExchange,
      {
        mappedBy: "order",
      }
    ),
    claims: model.hasMany<any /* <() => typeof OrderClaim> */>(
      () => OrderClaim,
      {
        mappedBy: "order",
      }
    ),
    returns: model.hasMany<any /* <() => typeof Return> */>(() => Return, {
      mappedBy: "order",
    }),
    changes: model.hasMany<any /* <() => typeof OrderChange> */>(
      () => OrderChange
    ),
  })
  .indexes([
    {
      name: "IDX_order_display_id",
      on: ["display_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_region_id",
      on: ["region_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_customer_id",
      on: ["customer_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_sales_channel_id",
      on: ["sales_channel_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_currency_code",
      on: ["currency_code"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_shipping_address_id",
      on: ["shipping_address_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_billing_address_id",
      on: ["billing_address_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_is_draft_order",
      on: ["is_draft_order"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export const Order = _Order
