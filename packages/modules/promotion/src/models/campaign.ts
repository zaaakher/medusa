import { model } from "@medusajs/framework/utils"
import CampaignBudget from "./campaign-budget"
import Promotion from "./promotion"

const Campaign = model
  .define(
    { name: "Campaign", tableName: "promotion_campaign" },
    {
      id: model.id({ prefix: "procamp" }).primaryKey(),
      name: model.text().searchable(),
      description: model.text().searchable().nullable(),
      campaign_identifier: model.text(),
      starts_at: model.dateTime().nullable(),
      ends_at: model.dateTime().nullable(),
      budget: model
        .hasOne(() => CampaignBudget, {
          mappedBy: "campaign",
        })
        .nullable(),
      promotions: model.hasMany(() => Promotion, {
        mappedBy: "campaign",
      }),
    }
  )
  .cascades({
    delete: ["budget"],
  })
  .indexes([
    {
      on: ["campaign_identifier"],
      unique: true,
      where: "deleted_at IS NULL",
    },
  ])

// @Entity({ tableName })
// @Filter(DALUtils.mikroOrmSoftDeletableFilterOptions)
// export default class Campaign {
//   [OptionalProps]?: OptionalFields | OptionalRelations

// @PrimaryKey({ columnType: "text" })
// id!: string

// @Searchable()
// @Property({ columnType: "text" })
// name: string

// @Searchable()
// @Property({ columnType: "text", nullable: true })
// description: string | null = null

// @Property({ columnType: "text" })
// @CampaignUniqueCampaignIdentifier.MikroORMIndex()
// campaign_identifier: string

// @Property({
//   columnType: "timestamptz",
//   nullable: true,
// })
// starts_at: Date | null = null

// @Property({
//   columnType: "timestamptz",
//   nullable: true,
// })
// ends_at: Date | null = null

// @OneToOne({
//   entity: () => CampaignBudget,
//   mappedBy: (cb) => cb.campaign,
//   cascade: ["soft-remove"] as any,
//   nullable: true,
// })
// budget: Rel<CampaignBudget> | null = null

// @OneToMany(() => Promotion, (promotion) => promotion.campaign)
// promotions = new Collection<Rel<Promotion>>(this)

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
//   this.id = generateEntityId(this.id, "procamp")
// }

// @OnInit()
// onInit() {
//   this.id = generateEntityId(this.id, "procamp")
// }
// }
export default Campaign
