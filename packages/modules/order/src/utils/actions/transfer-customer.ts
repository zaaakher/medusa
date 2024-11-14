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
    currentOrder.customer_id = action.details.reference
  },
  validate({ action }) {
    if (!action.details.reference) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Reference required."
      )
    }
  },
})
