import {
  AutoIncrementProperty,
  BelongsTo,
  BooleanProperty,
  DateTimeProperty,
  DmlEntity,
  DMLSchemaDefaults,
  DMLSchemaWithBigNumber,
  EnumProperty,
  HasMany,
  IdProperty,
  JSONProperty,
  model,
  NullableModifier,
  NumberProperty,
  OrderStatus,
  PrimaryKeyModifier,
  TextProperty,
} from "@medusajs/framework/utils"
import { Return } from "./return"
import { OrderClaim } from "./claim"
import { OrderItem } from "./order-item"
import { OrderAddress } from "./address"
import { OrderExchange } from "./exchange"
import { OrderChange } from "./order-change"
import { OrderSummary } from "./order-summary"
import { OrderTransaction } from "./transaction"
import { OrderShipping } from "./order-shipping-method"

type OrderSchema = {
  id: PrimaryKeyModifier<string, IdProperty>
  display_id: AutoIncrementProperty
  region_id: NullableModifier<string, TextProperty>
  customer_id: NullableModifier<string, TextProperty>
  version: NumberProperty
  sales_channel_id: NullableModifier<string, TextProperty>
  status: EnumProperty<typeof OrderStatus>
  is_draft_order: BooleanProperty
  email: NullableModifier<string, TextProperty>
  currency_code: TextProperty
  no_notification: NullableModifier<boolean, BooleanProperty>
  metadata: NullableModifier<Record<string, unknown>, JSONProperty>
  canceled_at: NullableModifier<Date, DateTimeProperty>
  exchanges: HasMany<typeof OrderExchange>
  claims: HasMany<typeof OrderClaim>
  returns: HasMany<typeof Return>
  changes: HasMany<typeof OrderChange>
  shipping_address: BelongsTo<typeof OrderAddress>
  billing_address: BelongsTo<typeof OrderAddress>
  summary: HasMany<typeof OrderSummary>
  items: HasMany<typeof OrderItem>
  shipping_methods: HasMany<typeof OrderShipping>
  transactions: HasMany<typeof OrderTransaction>
}

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
    no_notification: model.boolean().nullable(),
    metadata: model.json().nullable(),
    canceled_at: model.dateTime().nullable(),
    exchanges: model.hasMany<any>(() => OrderExchange, {
      mappedBy: "order",
    }),
    claims: model.hasMany<any>(() => OrderClaim, {
      mappedBy: "order",
    }),
    returns: model.hasMany<any>(() => Return, {
      mappedBy: "order",
    }),
    changes: model.hasMany<any>(() => OrderChange),
    shipping_address: model.belongsTo<any>(() => OrderAddress),
    billing_address: model.belongsTo<any>(() => OrderAddress),
    summary: model.hasMany<any>(() => OrderSummary, {
      mappedBy: "order",
    }),
    items: model.hasMany<any>(() => OrderItem, {
      mappedBy: "order",
    }),
    shipping_methods: model.hasMany<any>(() => OrderShipping, {
      mappedBy: "order",
    }),
    transactions: model.hasMany<any>(() => OrderTransaction, {
      mappedBy: "order",
    }),
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

export const Order = _Order as DmlEntity<
  DMLSchemaWithBigNumber<OrderSchema> & DMLSchemaDefaults & OrderSchema,
  "Order"
>
