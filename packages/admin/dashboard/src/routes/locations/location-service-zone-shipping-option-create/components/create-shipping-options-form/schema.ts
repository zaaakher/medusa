import { z } from "zod"
import { ShippingOptionPriceType } from "../../../common/constants"

export type CreateShippingOptionSchema = z.infer<
  typeof CreateShippingOptionSchema
>

export const CreateShippingOptionDetailsSchema = z.object({
  name: z.string().min(1),
  price_type: z.nativeEnum(ShippingOptionPriceType),
  enabled_in_store: z.boolean(),
  shipping_profile_id: z.string().min(1),
  provider_id: z.string().min(1),
})

enum PriceRuleAttribute {
  gte = "gte",
  gt = "gt",
  lte = "lte",
  lt = "lt",
}

const PriceRuleAttributeSchema = z.nativeEnum(PriceRuleAttribute)

const PriceRuleSchema = z.object({
  attribute: z.literal("cart_total"),
  operator: PriceRuleAttributeSchema,
  value: z.string(),
})

const ShippingOptionPriceSchema = z.object({
  amount: z.string(),
  rules: z.array(PriceRuleSchema).optional(),
})

export const CreateShippingOptionSchema = z
  .object({
    region_prices: z.record(z.string(), ShippingOptionPriceSchema),
    currency_prices: z.record(z.string(), z.string().optional()),
  })
  .merge(CreateShippingOptionDetailsSchema)
