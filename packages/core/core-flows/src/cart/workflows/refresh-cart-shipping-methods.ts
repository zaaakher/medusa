import { isDefined, isPresent } from "@medusajs/framework/utils"
import {
  createWorkflow,
  parallelize,
  transform,
  when,
  WorkflowData,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "../../common"
import { removeShippingMethodFromCartStep } from "../steps"
import { updateShippingMethodsStep } from "../steps/update-shipping-methods"
import { listShippingOptionsForCartWorkflow } from "./list-shipping-options-for-cart"

export const refreshCartShippingMethodsWorkflowId =
  "refresh-cart-shipping-methods"
/**
 * This workflow refreshes a cart's shipping methods
 */
export const refreshCartShippingMethodsWorkflow = createWorkflow(
  refreshCartShippingMethodsWorkflowId,
  (input: WorkflowData<{ cart_id: string }>) => {
    const cartQuery = useQueryGraphStep({
      entity: "cart",
      filters: { id: input.cart_id },
      fields: [
        "id",
        "sales_channel_id",
        "currency_code",
        "region_id",
        "shipping_methods.*",
        "shipping_address.city",
        "shipping_address.country_code",
        "shipping_address.province",
        "shipping_methods.shipping_option_id",
        "total",
      ],
      options: { throwIfKeyNotFound: true },
    }).config({ name: "get-cart" })

    const cart = transform({ cartQuery }, ({ cartQuery }) => cartQuery.data[0])
    const shippingOptionIds: string[] = transform({ cart }, ({ cart }) =>
      (cart.shipping_methods || [])
        .map((shippingMethod) => shippingMethod.shipping_option_id)
        .filter(Boolean)
    )

    when({ shippingOptionIds }, ({ shippingOptionIds }) => {
      return !!shippingOptionIds?.length
    }).then(() => {
      const shippingOptions = listShippingOptionsForCartWorkflow.runAsStep({
        input: {
          option_ids: shippingOptionIds,
          cart_id: cart.id,
          is_return: false,
          options: { shouldValidatePrices: false },
        },
      })

      const shippingMethodsData = transform(
        { cart, shippingOptions },
        ({ cart, shippingOptions }) => {
          const { shipping_methods: shippingMethods = [] } = cart
          const invalidShippingMethodIds = shippingMethods
            .filter(
              (shippingMethod) =>
                !isPresent(
                  shippingOptions.find(
                    (shippingOption) =>
                      shippingOption.id === shippingMethod.shipping_option_id &&
                      isDefined(
                        shippingOption.calculated_price?.calculated_amount
                      )
                  )
                )
            )
            .map((shippingMethod) => shippingMethod.id)

          const validShippingMethods = shippingMethods.filter(
            (shippingMethod) =>
              !invalidShippingMethodIds.includes(shippingMethod.id)
          )

          const shippingMethodsToUpdate = validShippingMethods.map(
            (shippingMethod) => {
              const shippingOption = shippingOptions.find(
                (s) => s.id === shippingMethod.shipping_option_id
              )!

              return {
                id: shippingMethod.id,
                shipping_option_id: shippingOption.id,
                amount: shippingOption.calculated_price.calculated_amount,
                is_tax_inclusive:
                  shippingOption.calculated_price
                    .is_calculated_price_tax_inclusive,
              }
            }
          )

          return {
            invalidShippingMethodIds,
            shippingMethodsToUpdate,
          }
        }
      )

      parallelize(
        removeShippingMethodFromCartStep({
          shipping_method_ids: shippingMethodsData.invalidShippingMethodIds,
        }),
        updateShippingMethodsStep(shippingMethodsData.shippingMethodsToUpdate)
      )
    })
  }
)
