import { OrderDTO, OrderWorkflow } from "@medusajs/framework/types"
import {
  WorkflowData,
  WorkflowResponse,
  createStep,
  createWorkflow,
  transform,
} from "@medusajs/framework/workflows-sdk"
import { CustomerDTO, OrderPreviewDTO } from "@medusajs/types"

import { useRemoteQueryStep } from "../../../common"
import { createOrderChangeStep } from "../../steps/create-order-change"
import { throwIfOrderIsCancelled } from "../../utils/order-validation"
import { createOrderChangeActionsWorkflow } from "../create-order-change-actions"
import { ChangeActionType, OrderChangeStatus } from "@medusajs/utils"
import { previewOrderChangeStep, updateOrderChangesStep } from "../../steps"

/**
 * This step validates that an order transfer can be requested.
 */
export const requestOrderTransferValidationStep = createStep(
  "request-order-transfer-validation",
  async function ({
    order,
    customer,
  }: {
    order: OrderDTO
    customer: CustomerDTO
  }) {
    throwIfOrderIsCancelled({ order })
    // TODO: throw if order change is active

    if (!customer.has_account) {
    }
  }
)

export const requestOrderTransferWorkflowId = "request-order-transfer-workflow"
/**
 * This workflow requests an order transfer.
 */
export const requestOrderTransferWorkflow = createWorkflow(
  requestOrderTransferWorkflowId,
  function (
    input: WorkflowData<OrderWorkflow.RequestOrderTransferWorkflowInput>
  ): WorkflowResponse<OrderPreviewDTO> {
    const order: OrderDTO = useRemoteQueryStep({
      entry_point: "orders",
      fields: ["id", "email", "status"],
      variables: { id: input.orderId },
      list: false,
      throw_if_key_not_found: true,
    })

    const customer: CustomerDTO = useRemoteQueryStep({
      entry_point: "customers",
      fields: ["id", "email", "has_account"],
      variables: { id: input.customerId },
      list: false,
      throw_if_key_not_found: true,
    })

    requestOrderTransferValidationStep({ order, customer })

    const orderChangeInput = transform({ input }, ({ input }) => {
      return {
        change_type: "transfer" as const,
        order_id: input.orderId,
        created_by: input.loggedInUser,
        description: input.description,
        internal_note: input.internalNote,
      }
    })

    const change = createOrderChangeStep(orderChangeInput)

    const actionInput = transform(
      { order, input, change },
      ({ order, input, change }) => [
        {
          order_change_id: change.id,
          order_id: input.orderId,
          action: ChangeActionType.TRANSFER_CUSTOMER,
          version: change.version,
          details: {
            // token,
            reference: input.customerId,
            originalEmail: order.email,
          },
        },
      ]
    )

    createOrderChangeActionsWorkflow.runAsStep({
      input: actionInput,
    })

    updateOrderChangesStep([
      {
        id: change.id,
        status: OrderChangeStatus.REQUESTED,
        requested_by: input.loggedInUser,
      },
    ])

    return new WorkflowResponse(previewOrderChangeStep(input.orderId))
  }
)
