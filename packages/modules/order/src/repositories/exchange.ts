import { DALUtils } from "@medusajs/framework/utils"
import { OrderExchange } from "@models"
import { setFindMethods } from "../utils/base-repository-find"

export class OrderExchangeRepository extends DALUtils.mikroOrmBaseRepositoryFactory(
  OrderExchange
) {
  constructor(...args: any[]) {
    // @ts-ignore
    super(...arguments)
  }
}

setFindMethods(OrderExchangeRepository, OrderExchange)
