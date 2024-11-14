import { ChangeActionType, MedusaError } from "@medusajs/framework/utils"
import { OrderChangeProcessing } from "../calculate-order-change"
import { setActionReference } from "../set-action-reference"

OrderChangeProcessing.registerActionType(ChangeActionType.TRANSFER_CUSTOMER, {
  operation({ action, currentOrder, options }) {
    setActionReference(
      {
        id: action.reference,
        order_id: currentOrder.id,
      },
      action,
      options
    )
    currentOrder.customer_id = action.reference_id
  },
  validate({ action }) {
    if (!action.reference_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Reference to customer ID is required"
      )
    }
  },
})
