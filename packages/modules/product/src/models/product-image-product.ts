import { Cascade, Entity, ManyToOne, PrimaryKeyType, Property, Rel } from "@mikro-orm/core"
import Product from "./product"
import ProductImage from "./product-image"

@Entity({ tableName: "product_images" })
export class ProductImageProduct {
  @ManyToOne(() => Product, { primary: true, cascade: [Cascade.REMOVE] })
  product!: Rel<Product>

  @ManyToOne(() => ProductImage, { primary: true, cascade: [Cascade.REMOVE] })
  image!: Rel<ProductImage>

  @Property({ columnType: "integer", default: 0, nullable: false })
  rank!: number

  [PrimaryKeyType]?: [string, string]
}