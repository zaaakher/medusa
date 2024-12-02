import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
  transform,
  createStep,
} from "@medusajs/framework/workflows-sdk"
import {
  OrderDTO,
  OrderWorkflow,
  RegisterOrderChangeDTO,
} from "@medusajs/framework/types"

import { useQueryGraphStep } from "../../common"
import { updateOrdersStep } from "../steps/update-orders"
import { MedusaError } from "@medusajs/framework/utils"
import { registerOrderChangeStep } from "../steps/register-order-change"

/**
 * This step validates that an order can be updated with provided input.
 */
export const updateOrderShippingAddressValidationStep = createStep(
  "update-order-shipping-address-validation",
  async function ({
    order,
    input,
  }: {
    order: OrderDTO
    input: OrderWorkflow.UpdateOrderShippingAddressWorkflowInput
  }) {
    if (
      input.shipping_address?.country_code &&
      order.shipping_address?.country_code !==
        input.shipping_address?.country_code
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Country code cannot be changed"
      )
    }
  }
)

export const updateOrderShippingAddressWorkflowId =
  "update-order-shipping-address-workflow"

export const updateOrderShippingAddressWorkflow = createWorkflow(
  updateOrderShippingAddressWorkflowId,
  function (
    input: WorkflowData<OrderWorkflow.UpdateOrderShippingAddressWorkflowInput>
  ) {
    const orderQuery = useQueryGraphStep({
      entity: "order",
      fields: ["id", "shipping_address.*"],
      filters: { id: input.order_id },
      options: { throwIfKeyNotFound: true },
    }).config({ name: "order-query" })

    const order = transform(
      { orderQuery },
      ({ orderQuery }) => orderQuery.data[0]
    )

    updateOrderShippingAddressValidationStep({ order, input })

    const updateInput = transform({ input, order }, ({ input, order }) => {
      const address = {
        // we want to create a new address
        ...order.shipping_address,
        ...input.shipping_address,
      }
      delete address.id

      return { shipping_address: address }
    })

    updateOrdersStep({
      selector: { id: input.order_id },
      update: updateInput,
    })

    const orderChangeInput = transform({ input }, ({ input }) => {
      return {
        change_type: "update_order" as const,
        order_id: input.order_id,
        description: input.description,
        internal_note: input.internal_note,
        reference: "shipping_address",
        reference_id: order.shipping_address?.id, // save previous address id as reference
        details: input.shipping_address as Record<string, unknown>, // save what changed on the address
      } as RegisterOrderChangeDTO
    })

    registerOrderChangeStep(orderChangeInput)

    return new WorkflowResponse(order)
  }
)
