import { ChangeActionType } from "@medusajs/framework/utils"

import { OrderChangeProcessing } from "../calculate-order-change"
import { setActionReference } from "../set-action-reference"

OrderChangeProcessing.registerActionType(
  ChangeActionType.CHANGE_SHIPPING_ADDRESS,
  {
    operation({ action, currentOrder, options }) {
      // noop
      // currentOrder.shipping_address_id = action.reference_id

      setActionReference(currentOrder, action, options)
    },
    validate({ action }) {
      // noop
    },
  }
)
