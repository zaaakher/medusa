import { Cascade, Entity, ManyToOne, PrimaryKey, PrimaryKeyProp, Property, Rel } from "@mikro-orm/core"
import Product from "./product"
import ProductImage from "./product-image"

@Entity({ tableName: "product_images" })
export class ProductImageProduct {
  @PrimaryKey({ columnType: "text" })
  product_id: string

  @PrimaryKey({ columnType: "text" })
  image_id: string

  @ManyToOne({
    primary: true,
    entity: () => Product,
    fieldName: "product_id",
    index: "IDX_product_image_product_product_id",
    cascade: [Cascade.REMOVE],
  })
  product: Rel<Product>

  @ManyToOne({
    primary: true,
    entity: () => ProductImage,
    fieldName: "image_id",
    index: "IDX_product_image_product_image_id",
    cascade: [Cascade.REMOVE],
  })
  image: Rel<ProductImage>

  @Property({ columnType: "integer", default: 0 })
  rank: number

  [PrimaryKeyProp]?: ["product", "image"]
}
