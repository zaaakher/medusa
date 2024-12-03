import { PromotionUtils, model } from "@medusajs/framework/utils"
import Campaign from "./campaign"

const CampaignBudget = model.define(
  { name: "CampaignBudget", tableName: "promotion_campaign_budget" },
  {
    id: model.id({ prefix: "probudg" }).primaryKey(),
    type: model
      .enum(PromotionUtils.CampaignBudgetType)
      .index("IDX_campaign_budget_type"),
    currency_code: model.text().nullable(),
    limit: model.bigNumber().nullable(),
    used: model.bigNumber().default(0),
    campaign: model.belongsTo(() => Campaign, {
      mappedBy: "budget",
    }),
  }
)

// @Entity({ tableName: "promotion_campaign_budget" })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class CampaignBudget {
//   [OptionalProps]?: OptionalFields

// @PrimaryKey({ columnType: "text" })
// id!: string

// @Index({ name: "IDX_campaign_budget_type" })
// @Enum(() => PromotionUtils.CampaignBudgetType)
// type: CampaignBudgetTypeValues

// @OneToOne({
//   entity: () => Campaign,
// })
// campaign: Rel<Campaign> | null = null

// @Property({ columnType: "text", nullable: true })
// currency_code: string | null = null

// @MikroOrmBigNumberProperty({ nullable: true })
// limit: BigNumber | number | null = null

// @Property({ columnType: "jsonb", nullable: true })
// raw_limit: BigNumberRawValue | null = null

// @MikroOrmBigNumberProperty({ default: 0 })
// used: BigNumber | number = 0

// @Property({ columnType: "jsonb" })
// raw_used: BigNumberRawValue

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
//   this.id = generateEntityId(this.id, "probudg")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "probudg")
// }
// }
export default CampaignBudget
