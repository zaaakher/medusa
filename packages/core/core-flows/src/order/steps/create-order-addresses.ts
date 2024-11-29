import { CreateOrderAddressDTO, IOrderModuleService } from "@medusajs/types"
import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/utils"

export const createOrderAddressStepId = "create-order-address-step"

export const createOrderAddressStep = createStep(
  createOrderAddressStepId,
  async (input: CreateOrderAddressDTO[], { container }) => {
    const orderModule = (await container.resolve(
      Modules.ORDER
    )) as IOrderModuleService

    const addresses = await orderModule.createOrderAddresses(input)

    return new StepResponse(
      addresses,
      addresses.map((a) => a.id)
    )
  },
  async (addressIds, { container }) => {
    if (!addressIds?.length) {
      return
    }

    const orderModule = (await container.resolve(
      Modules.ORDER
    )) as IOrderModuleService

    await orderModule.deleteOrderAddresses(addressIds)
  }
)
