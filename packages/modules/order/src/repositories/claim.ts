import { DALUtils } from "@medusajs/framework/utils"
import { OrderClaim } from "@models"
import { setFindMethods } from "../utils/base-repository-find"

export class OrderClaimRepository extends DALUtils.mikroOrmBaseRepositoryFactory(
  OrderClaim
) {
  constructor(...args: any[]) {
    // @ts-ignore
    super(...arguments)
  }
}

setFindMethods(OrderClaimRepository, OrderClaim)
