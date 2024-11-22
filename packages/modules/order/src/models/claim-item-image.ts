import { model } from "@medusajs/framework/utils"
import ClaimItem from "./claim-item"

const ClaimItemImageDeletedAtIndex = "IDX_order_claim_item_image_deleted_at"
const ClaimItemIdIndex = "IDX_order_claim_item_image_claim_item_id"

const OrderClaimItemImage = model
  .define("OrderClaimItemImage", {
    id: model.id({ prefix: "climg" }).primaryKey(),
    claim_item: model.belongsTo(() => ClaimItem, {
      mappedBy: "images",
    }),
    url: model.text(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: ClaimItemImageDeletedAtIndex,
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: ClaimItemIdIndex,
      on: ["claim_item_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderClaimItemImage
