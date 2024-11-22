import { model, OrderStatus } from "@medusajs/framework/utils"
import OrderAddress from "./address"
import OrderItem from "./order-item"
import OrderShipping from "./order-shipping-method"
import OrderSummary from "./order-summary"
import OrderTransaction from "./transaction"

const DisplayIdIndex = "IDX_order_display_id"
const RegionIdIndex = "IDX_order_region_id"
const CustomerIdIndex = "IDX_order_customer_id"
const SalesChannelIdIndex = "IDX_order_sales_channel_id"
const OrderDeletedAtIndex = "IDX_order_deleted_at"
const CurrencyCodeIndex = "IDX_order_currency_code"
const ShippingAddressIdIndex = "IDX_order_shipping_address_id"
const BillingAddressIdIndex = "IDX_order_billing_address_id"
const IsDraftOrderIndex = "IDX_order_is_draft_order"

const Order = model
  .define("Order", {
    id: model.id({ prefix: "order" }).primaryKey(),
    display_id: model.number(), // TODO: numberic .searchable()
    region_id: model.text().nullable(),
    customer_id: model.text().nullable(),
    version: model.number().default(1),
    sales_channel_id: model.text().nullable(),
    status: model.enum(OrderStatus).default(OrderStatus.PENDING),
    is_draft_order: model.boolean().default(false),
    email: model.text().searchable().nullable(),
    currency_code: model.text(),
    shipping_address_id: model.text().nullable(),
    shipping_address: model.belongsTo(() => OrderAddress, {
      mappedBy: "shipping_orders",
    }),
    billing_address_id: model.text().nullable(),
    billing_address: model.belongsTo(() => OrderAddress, {
      mappedBy: "billing_orders",
    }),
    no_notification: model.boolean().nullable(),
    summary: model.hasMany(() => OrderSummary, {
      mappedBy: "order",
    }),
    metadata: model.json().nullable(),
    items: model.hasMany(() => OrderItem, {
      mappedBy: "order",
    }),
    shipping_methods: model.hasMany(() => OrderShipping, {
      mappedBy: "order",
    }),
    transactions: model.hasMany(() => OrderTransaction, {
      mappedBy: "order",
    }),
    canceled_at: model.dateTime().nullable(),
  })
  .indexes([
    {
      name: DisplayIdIndex,
      on: ["display_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: RegionIdIndex,
      on: ["region_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: CustomerIdIndex,
      on: ["customer_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: SalesChannelIdIndex,
      on: ["sales_channel_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: OrderDeletedAtIndex,
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: CurrencyCodeIndex,
      on: ["currency_code"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ShippingAddressIdIndex,
      on: ["shipping_address_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: BillingAddressIdIndex,
      on: ["billing_address_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: IsDraftOrderIndex,
      on: ["is_draft_order"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default Order
