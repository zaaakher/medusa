import { ClaimReason, model } from "@medusajs/framework/utils"
import { OrderClaim } from "./claim"
import { OrderClaimItemImage } from "./claim-item-image"
import { OrderLineItem } from "./line-item"

const _OrderClaimItem = model
  .define("OrderClaimItem", {
    id: model.id({ prefix: "claitem" }).primaryKey(),
    images: model.hasMany<any /* <() => typeof OrderClaimItemImage> */>(
      () => OrderClaimItemImage,
      {
        mappedBy: "claim_item",
      }
    ),
    reason: model.enum(ClaimReason).nullable(),
    quantity: model.bigNumber(),
    claim: model.belongsTo<any /* <() => typeof OrderClaim> */>(
      () => OrderClaim,
      {
        mappedBy: "additional_items",
      }
    ),
    item: model.belongsTo<any /* <() => typeof OrderLineItem> */>(
      () => OrderLineItem,
      {
        mappedBy: "claim_items",
      }
    ),
    is_additional_item: model.boolean().default(false),
    note: model.text().nullable(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: "IDX_order_claim_item_claim_id",
      on: ["claim_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_claim_item_item_id",
      on: ["item_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_claim_item_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export const OrderClaimItem = _OrderClaimItem
