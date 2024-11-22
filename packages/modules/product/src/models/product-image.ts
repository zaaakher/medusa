import { model } from "@medusajs/framework/utils"
import Product from "./product"

const ProductImage = model
  .define(
    { tableName: "image", name: "ProductImage" },
    {
      id: model.id({ prefix: "img" }).primaryKey(),
      url: model.text(),
      metadata: model.json().nullable(),
      products: model.manyToMany(() => Product),
    }
  )
  .indexes([
    {
      name: "IDX_product_image_url",
      on: ["url"],
      unique: false,
      where: "deleted_at IS NULL",
    },
  ])

export default ProductImage
