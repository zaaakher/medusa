import { PromotionUtils, model } from "@medusajs/framework/utils"
import ApplicationMethod from "./application-method"
import Promotion from "./promotion"
import PromotionRuleValue from "./promotion-rule-value"

const PromotionRule = model
  .define(
    {
      name: "PromotionRule",
      tableName: "promotion_rule",
    },
    {
      id: model.id({ prefix: "prorul" }).primaryKey(),
      description: model.text().nullable(),
      attribute: model.text().index("IDX_promotion_rule_attribute"),
      operator: model
        .enum(PromotionUtils.PromotionRuleOperator)
        .index("IDX_promotion_rule_operator"),
      values: model.hasMany(() => PromotionRuleValue, {
        mappedBy: "promotion_rule",
      }),
      promotions: model.manyToMany(() => Promotion, {
        mappedBy: "rules",
      }),
      method_target_rules: model.manyToMany(() => ApplicationMethod, {
        mappedBy: "target_rules",
      }),
      method_buy_rules: model.manyToMany(() => ApplicationMethod, {
        mappedBy: "buy_rules",
      }),
    }
  )
  .cascades({
    delete: ["values"],
  })

// @Entity({ tableName: "promotion_rule" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class PromotionRule {
//   [OptionalProps]?: OptionalFields | OptionalRelations

// @PrimaryKey({ columnType: "text" })
// id!: string

// @Property({ columnType: "text", nullable: true })
// description: string | null = null

// @Index({ name: "IDX_promotion_rule_attribute" })
// @Property({ columnType: "text" })
// attribute: string

// @Index({ name: "IDX_promotion_rule_operator" })
// @Enum(() => PromotionUtils.PromotionRuleOperator)
// operator: PromotionRuleOperatorValues

// @OneToMany(() => PromotionRuleValue, (prv) => prv.promotion_rule, {
//   cascade: [Cascade.REMOVE],
// })
// values = new Collection<Rel<PromotionRuleValue>>(this)

// @ManyToMany(() => Promotion, (promotion) => promotion.rules)
// promotions = new Collection<Rel<Promotion>>(this)

// @ManyToMany(
//   () => ApplicationMethod,
//   (applicationMethod) => applicationMethod.target_rules
// )
// method_target_rules = new Collection<Rel<ApplicationMethod>>(this)

// @ManyToMany(
//   () => ApplicationMethod,
//   (applicationMethod) => applicationMethod.buy_rules
// )
// method_buy_rules = new Collection<Rel<ApplicationMethod>>(this)

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
//   this.id = generateEntityId(this.id, "prorul")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "prorul")
// }
// }
export default PromotionRule
