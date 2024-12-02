import {
  IOrderModuleService,
  RegisterOrderChangeDTO,
} from "@medusajs/framework/types"
import { ModuleRegistrationName } from "@medusajs/framework/utils"
import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk"

export const registerOrderChangeStepId = "register-order-change"

/**
 * This step registers an order change.
 */
export const registerOrderChangeStep = createStep(
  registerOrderChangeStepId,
  async (data: RegisterOrderChangeDTO, { container }) => {
    const service = container.resolve<IOrderModuleService>(
      ModuleRegistrationName.ORDER
    )

    const orderChange = await service.registerOrderChange(data)

    return new StepResponse(void 0, orderChange.id)
  },
  async (orderChangeId, { container }) => {
    if (!orderChangeId) {
      return
    }

    const service = container.resolve<IOrderModuleService>(
      ModuleRegistrationName.ORDER
    )

    await service.deleteOrderChanges([orderChangeId])
  }
)
