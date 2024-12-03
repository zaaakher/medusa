import { PromotionUtils, model } from "@medusajs/framework/utils"
import ApplicationMethod from "./application-method"
import Campaign from "./campaign"
import PromotionRule from "./promotion-rule"

const Promotion = model
  .define("Promotion", {
    id: model.id({ prefix: "promo" }).primaryKey(),
    code: model
      .text()
      .searchable()
      .unique("IDX_promotion_code_unique")
      .index("IDX_promotion_code"),
    is_automatic: model.boolean().default(false),
    type: model.enum(PromotionUtils.PromotionType).index("IDX_promotion_type"),
    campaign: model
      .belongsTo(() => Campaign, {
        mappedBy: "promotions",
      })
      .nullable(),
    application_method: model.hasOne<() => typeof ApplicationMethod>(
      () => ApplicationMethod,
      {
        mappedBy: "promotion",
      }
    ),
    rules: model.manyToMany<() => typeof PromotionRule>(() => PromotionRule, {
      pivotTable: "promotion_promotion_rule",
      mappedBy: "promotions",
    }),
  })
  .cascades({
    delete: ["application_method"],
  })

// @Entity({ tableName: "promotion" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class Promotion {
//   [OptionalProps]?: OptionalFields | OptionalRelations

// @PrimaryKey({ columnType: "text" })
// id!: string

// @Searchable()
// @Property({ columnType: "text" })
// @Index({ name: "IDX_promotion_code" })
// @Unique({
//   name: "IDX_promotion_code_unique",
//   properties: ["code"],
// })
// code: string

// @ManyToOne(() => Campaign, {
//   columnType: "text",
//   fieldName: "campaign_id",
//   nullable: true,
//   mapToPk: true,
// })
// campaign_id: string | null = null

// @ManyToOne(() => Campaign, { persist: false })
// campaign: Rel<Campaign> | null

// @Property({ columnType: "boolean", default: false })
// is_automatic: boolean = false

// @Index({ name: "IDX_promotion_type" })
// @Enum(() => PromotionUtils.PromotionType)
// type: PromotionTypeValues

// @OneToOne({
//   entity: () => ApplicationMethod,
//   mappedBy: (am) => am.promotion,
//   cascade: ["soft-remove"] as any,
// })
// application_method: Rel<ApplicationMethod>

// @ManyToMany(() => PromotionRule, "promotions", {
//   owner: true,
//   pivotTable: "promotion_promotion_rule",
//   cascade: ["soft-remove"] as any,
// })
// rules = new Collection<Rel<PromotionRule>>(this)

// @Property({
//   onCreate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// created_at: Date

// @Property({
//   onCreate: () => new Date(),
//   onUpdate: () => new Date(),
//   columnType: "timestamptz",
//   defaultRaw: "now()",
// })
// updated_at: Date

// @Property({ columnType: "timestamptz", nullable: true })
// deleted_at: Date | null = null

// @BeforeCreate()
// onCreate() {
//   this.id = generateEntityId(this.id, "promo")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "promo")
// }
// }

export default Promotion
