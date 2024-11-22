import { ClaimReason, model } from "@medusajs/framework/utils"
import Claim from "./claim"
import OrderClaimItemImage from "./claim-item-image"
import OrderLineItem from "./line-item"

const ClaimIdIndex = "IDX_order_claim_item_claim_id"
const ItemIdIndex = "IDX_order_claim_item_item_id"
const DeletedAtIndex = "IDX_order_claim_item_deleted_at"

const OrderClaimItem = model
  .define("OrderClaimItem", {
    id: model.id({ prefix: "claitem" }).primaryKey(),
    images: model.hasMany(() => OrderClaimItemImage, {
      mappedBy: "item",
    }),
    reason: model.enum(ClaimReason).nullable(),
    quantity: model.bigNumber(),
    raw_quantity: model.json(),
    claim: model.belongsTo(() => Claim, {
      mappedBy: "items",
    }),
    item: model.belongsTo(() => OrderLineItem, {
      mappedBy: "items",
    }),
    is_additional_item: model.boolean().default(false),
    note: model.text().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: ClaimIdIndex,
      on: ["claim_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ItemIdIndex,
      on: ["item_id"],
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

export default OrderClaimItem
