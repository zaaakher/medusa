import {
  OrderChangeDTO,
  OrderDTO,
  OrderPreviewDTO,
} from "@medusajs/framework/types"
import { OrderChangeStatus } from "@medusajs/framework/utils"
import {
  WorkflowResponse,
  createStep,
  createWorkflow,
} from "@medusajs/framework/workflows-sdk"
import { useRemoteQueryStep } from "../../../common"
import { previewOrderChangeStep } from "../../steps"
import { confirmOrderChanges } from "../../steps/confirm-order-changes"
import {
  throwIfIsCancelled,
  throwIfOrderChangeIsNotActive,
} from "../../utils/order-validation"

export type ConfirmOrderTransferRequestWorkflowInput = {
  order_id: string
  confirmed_by?: string
}

/**
 * This step validates that a requested order transfer can be confirmed.
 */
export const confirmOrderTransferRequestValidationStep = createStep(
  "validate-confirm-order-transfer-request",
  async function ({
    order,
    orderChange,
  }: {
    order: OrderDTO
    orderChange: OrderChangeDTO
  }) {
    throwIfIsCancelled(order, "Order")
    throwIfOrderChangeIsNotActive({ orderChange })
  }
)

export const confirmOrderTransferRequestWorkflowId =
  "confirm-order-transfer-request"
/**
 * This workflow confirms an order transfer request.
 */
export const confirmOrderTransferRequestWorkflow = createWorkflow(
  confirmOrderTransferRequestWorkflowId,
  function (
    input: ConfirmOrderTransferRequestWorkflowInput
  ): WorkflowResponse<OrderPreviewDTO> {
    const order: OrderDTO = useRemoteQueryStep({
      entry_point: "orders",
      fields: [
        "id",
        "version",
        "canceled_at",
        "items.id",
        "items.title",
        "items.variant_title",
        "items.variant_sku",
        "items.variant_barcode",
        "shipping_address.*",
      ],
      variables: { id: input.order_id },
      list: false,
      throw_if_key_not_found: true,
    }).config({ name: "order-query" })

    const orderChange: OrderChangeDTO = useRemoteQueryStep({
      entry_point: "order_change",
      fields: [
        "id",
        "status",
        "actions.id",
        "actions.order_id",
        "actions.return_id",
        "actions.action",
        "actions.details",
        "actions.reference",
        "actions.reference_id",
        "actions.internal_note",
      ],
      variables: {
        filters: {
          order_id: input.order_id,
          status: [OrderChangeStatus.PENDING, OrderChangeStatus.REQUESTED],
        },
      },
      list: false,
    }).config({ name: "order-change-query" })

    confirmOrderTransferRequestValidationStep({
      order,
      orderChange,
    })

    const orderPreview = previewOrderChangeStep(order.id)

    confirmOrderChanges({
      changes: [orderChange],
      orderId: order.id,
      confirmed_by: input.confirmed_by,
    })

    return new WorkflowResponse(orderPreview)
  }
)
