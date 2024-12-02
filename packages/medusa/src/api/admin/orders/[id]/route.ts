import {
  getOrderDetailWorkflow,
  updateOrderWorkflow,
} from "@medusajs/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { HttpTypes } from "@medusajs/framework/types"
import {
  AdminGetOrdersOrderParamsType,
  AdminUpdateOrderType,
} from "../validators"
import { remoteQueryObjectFromString } from "@medusajs/framework/utils"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export const GET = async (
  req: AuthenticatedMedusaRequest<AdminGetOrdersOrderParamsType>,
  res: MedusaResponse<HttpTypes.AdminOrderResponse>
) => {
  const workflow = getOrderDetailWorkflow(req.scope)
  const { result } = await workflow.run({
    input: {
      fields: req.remoteQueryConfig.fields,
      order_id: req.params.id,
      version: req.validatedQuery.version as number,
    },
  })

  res.status(200).json({ order: result as HttpTypes.AdminOrder })
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminUpdateOrderType>,
  res: MedusaResponse<HttpTypes.AdminOrderResponse>
) => {
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const variables = { id: req.params.id }

  await updateOrderWorkflow(req.scope).run({
    input: {
      ...req.validatedBody,
      id: req.params.id,
    },
  })

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "order",
    variables,
    fields: req.remoteQueryConfig.fields,
  })

  const [order] = await remoteQuery(queryObject)
  res.status(200).json({ order })
}
