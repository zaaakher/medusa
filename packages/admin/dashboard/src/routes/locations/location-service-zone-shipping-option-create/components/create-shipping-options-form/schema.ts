import { z } from "zod"
import { castNumber } from "../../../../../lib/cast-number"
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

const ShippingOptionPriceSchema = z
  .object({
    amount: z.union([z.string(), z.number()]),
    gte: z.union([z.string(), z.number()]).optional(),
    lte: z.union([z.string(), z.number()]).optional(),
  })
  .refine(
    (data) => {
      return (
        (data.gte !== undefined && data.gte !== "") ||
        (data.lte !== undefined && data.lte !== "")
      )
    },
    {
      message: "At least one of minimum or maximum cart total must be defined",
      path: ["gte"],
    }
  )
  .refine(
    (data) => {
      if (data.gte !== undefined && data.lte !== undefined) {
        const gte = castNumber(data.gte)
        const lte = castNumber(data.lte)
        return gte <= lte
      }
      return true
    },
    {
      message:
        "Minimum cart total must be less than or equal to maximum cart total",
      path: ["gte"],
    }
  )

export const ShippingOptionConditionalPriceSchema = z.object({
  custom_region_prices: z.record(
    z.string(),
    z.array(ShippingOptionPriceSchema).optional()
  ),
  custom_currency_prices: z.record(
    z.string(),
    z.array(ShippingOptionPriceSchema).optional()
  ),
})

export type ShippingOptionConditionalPriceSchemaType = z.infer<
  typeof ShippingOptionConditionalPriceSchema
>

export const CondtionalPriceRuleSchema = z.object({
  prices: z.array(ShippingOptionPriceSchema),
})

export type CondtionalPriceRuleSchemaType = z.infer<
  typeof CondtionalPriceRuleSchema
>

export const CreateShippingOptionSchema = z
  .object({
    region_prices: z.record(z.string(), z.string().optional()),
    currency_prices: z.record(z.string(), z.string().optional()),
  })
  .merge(CreateShippingOptionDetailsSchema)
  .merge(ShippingOptionConditionalPriceSchema)

export type CreateShippingOptionSchemaType = z.infer<
  typeof CreateShippingOptionSchema
>
