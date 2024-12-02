import { model } from "@medusajs/framework/utils"

export const Invite = model
  .define("invite", {
    id: model.id({ prefix: "invite" }).primaryKey(),
    email: model.text().searchable(),
    accepted: model.boolean().default(false),
    token: model.text(),
    expires_at: model.dateTime(),
    metadata: model.json().nullable(),
  })
  .indexes([
    {
      name: "IDX_invite_email",
      on: ["email"],
      unique: true,
      where: "deleted_at IS NULL",
    },
    {
      name: "IDX_invite_token",
      on: ["token"],
      where: "deleted_at IS NULL",
    },
  ])
