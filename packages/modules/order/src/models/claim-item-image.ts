import { model } from "@medusajs/framework/utils"
import ClaimItem from "./claim-item"

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
      name: "IDX_order_claim_item_image_deleted_at",
      on: ["deleted_at"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
    {
      name: "IDX_order_claim_item_image_claim_item_id",
      on: ["claim_item_id"],
      unique: false,
      where: "deleted_at IS NOT NULL",
    },
  ])

export default OrderClaimItemImage
