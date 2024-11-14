import { medusaIntegrationTestRunner } from "@medusajs/test-utils"
import {
  adminHeaders,
  createAdminUser,
} from "../../../../helpers/create-admin-user"
import { createOrderSeeder } from "../../fixtures/order"

jest.setTimeout(300000)

medusaIntegrationTestRunner({
  testSuite: ({ dbConnection, getContainer, api }) => {
    let order
    let customer
    let user

    beforeEach(async () => {
      const container = getContainer()

      user = (await createAdminUser(dbConnection, adminHeaders, container)).user
      const seeders = await createOrderSeeder({ api, container })

      customer = (
        await api.post(
          "/admin/customers",
          {
            first_name: "john",
            email: "john@medusajs.com",
          },
          adminHeaders
        )
      ).data.customer

      order = seeders.order
    })

    describe("Transfer Order flow", () => {
      it("should request order transfer successfully", async () => {
        await api.post(
          `/admin/orders/${order.id}/transfer`,
          {
            customer_id: customer.id,
          },
          adminHeaders
        )

        const orderResult = (
          await api.get(
            `/admin/orders/${order.id}?fields=+customer_id,+email`,
            adminHeaders
          )
        ).data.order

        expect(orderResult.email).toEqual("tony@stark-industries.com")
        expect(orderResult.customer_id).not.toEqual(customer.id) // didn't transfer anything yet

        const orderPreviewResult = (
          await api.get(`/admin/orders/${order.id}/preview`, adminHeaders)
        ).data.order

        expect(orderPreviewResult).toEqual(
          expect.objectContaining({
            customer_id: customer.id,
            order_change: expect.objectContaining({
              change_type: "transfer",
              status: "requested",
              requested_by: user.id,
            }),
          })
        )

        const orderChangesResult = (
          await api.get(`/admin/orders/${order.id}/changes`, adminHeaders)
        ).data.order_changes

        expect(orderChangesResult.length).toEqual(1)
        expect(orderChangesResult[0]).toEqual(
          expect.objectContaining({
            change_type: "transfer",
            status: "requested",
            requested_by: user.id,
            created_by: user.id,
            confirmed_by: null,
            confirmed_at: null,
            declined_by: null,
            actions: expect.arrayContaining([
              expect.objectContaining({
                version: 2,
                action: "TRANSFER_CUSTOMER",
                reference: "customer",
                reference_id: customer.id,
                details: expect.objectContaining({
                  token: expect.any(String),
                  original_email: "tony@stark-industries.com",
                }),
              }),
            ]),
          })
        )
      })
    })
  },
})
