import { PromotionUtils, model } from "@medusajs/framework/utils"
import Promotion from "./promotion"
import PromotionRule from "./promotion-rule"

const ApplicationMethod = model
  .define(
    { name: "ApplicationMethod", tableName: "promotion_application_method" },
    {
      id: model.id({ prefix: "proappmet" }).primaryKey(),
      value: model.bigNumber().nullable(),
      currency_code: model.text().nullable(),
      max_quantity: model.number().nullable(),
      apply_to_quantity: model.number().nullable(),
      buy_rules_min_quantity: model.number().nullable(),
      type: model
        .enum(PromotionUtils.ApplicationMethodType)
        .index("IDX_application_method_type"),
      target_type: model
        .enum(PromotionUtils.ApplicationMethodTargetType)
        .index("IDX_application_method_target_type"),
      allocation: model
        .enum(PromotionUtils.ApplicationMethodAllocation)
        .index("IDX_application_method_allocation")
        .nullable(),
      promotion: model.belongsTo(() => Promotion, {
        mappedBy: "application_method",
      }),
      target_rules: model.manyToMany(() => PromotionRule, {
        pivotTable: "application_method_target_rules",
        mappedBy: "method_target_rules",
      }),
      buy_rules: model.manyToMany(() => PromotionRule, {
        pivotTable: "application_method_buy_rules",
        mappedBy: "method_buy_rules",
      }),
    }
  )
  .indexes([
    {
      on: ["currency_code"],
      where: "deleted_at IS NOT NULL",
    },
  ])

// @Entity({ tableName })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class ApplicationMethod {
// @PrimaryKey({ columnType: "text" })
// id!: string
// @MikroOrmBigNumberProperty()
// value: BigNumber | number | null
// @Property({ columnType: "jsonb" })
// raw_value: BigNumberRawValue | null
// @Property({ columnType: "text", nullable: true })
// @CurrencyCodeIndex.MikroORMIndex()
// currency_code: string | null = null
// @Property({ columnType: "numeric", nullable: true, serializer: Number })
// max_quantity?: number | null = null
// @Property({ columnType: "numeric", nullable: true, serializer: Number })
// apply_to_quantity?: number | null = null
// @Property({ columnType: "numeric", nullable: true, serializer: Number })
// buy_rules_min_quantity?: number | null = null
// @Index({ name: "IDX_application_method_type" })
// @Enum(() => PromotionUtils.ApplicationMethodType)
// type: ApplicationMethodTypeValues
// @Index({ name: "IDX_application_method_target_type" })
// @Enum(() => PromotionUtils.ApplicationMethodTargetType)
// target_type: ApplicationMethodTargetTypeValues
// @Index({ name: "IDX_application_method_allocation" })
// @Enum({
//   items: () => PromotionUtils.ApplicationMethodAllocation,
//   nullable: true,
// })
// allocation?: ApplicationMethodAllocationValues
// @OneToOne({
//   entity: () => Promotion,
//   onDelete: "cascade",
// })
// promotion: Rel<Promotion>
// @ManyToMany(() => PromotionRule, "method_target_rules", {
//   owner: true,
//   pivotTable: "application_method_target_rules",
//   cascade: ["soft-remove"] as any,
// })
// target_rules = new Collection<Rel<PromotionRule>>(this)
// @ManyToMany(() => PromotionRule, "method_buy_rules", {
//   owner: true,
//   pivotTable: "application_method_buy_rules",
//   cascade: ["soft-remove"] as any,
// })
// buy_rules = new Collection<Rel<PromotionRule>>(this)
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
//   this.id = generateEntityId(this.id, "proappmet")
// }
// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "proappmet")
// }
// }
export default ApplicationMethod
