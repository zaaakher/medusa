import {
  createWorkflow,
  WorkflowData,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk"
import { OrderWorkflow } from "@medusajs/framework/types"

import { useQueryGraphStep } from "../../common"
import { createOrderChangeStep } from "../steps"
import { updateOrdersStep } from "../steps/update-orders"
import { ChangeActionType } from "@medusajs/framework/utils"
import { createOrderChangeActionsWorkflow } from "./create-order-change-actions"
import { confirmOrderChanges } from "../steps/confirm-order-changes"

export const updateOrderShippingAddressWorkflowId =
  "update-order-shipping-address-workflow"

export const updateOrderShippingAddressWorkflow = createWorkflow(
  updateOrderShippingAddressWorkflowId,
  function (
    input: WorkflowData<OrderWorkflow.UpdateOrderShippingAddressWorkflowInput>
  ) {
    const orderQuery = useQueryGraphStep({
      entity: "order",
      fields: ["id", "shipping_address"],
      filters: { id: input.order_id },
      options: { throwIfKeyNotFound: true },
    }).config({ name: "order-query" })

    const order = transform(
      { orderQuery },
      ({ orderQuery }) => orderQuery.data[0]
    )

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
        change_type: "shipping_address_change" as const,
        order_id: input.order_id,
        description: input.description,
        internal_note: input.internal_note,
      }
    })

    const change = createOrderChangeStep(orderChangeInput)

    const actionInput = transform(
      { order, input, change },
      ({ order, input, change }) => [
        {
          order_change_id: change.id,
          order_id: input.order_id,
          action: ChangeActionType.CHANGE_SHIPPING_ADDRESS,
          version: change.version,
          reference: "shipping_address",
          details: order.shipping_address,
        },
      ]
    )

    createOrderChangeActionsWorkflow.runAsStep({
      input: actionInput,
    })

    confirmOrderChanges({
      orderId: input.order_id,
      changes: [change],
    })

    return new WorkflowResponse(order)
  }
)
