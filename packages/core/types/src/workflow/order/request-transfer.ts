export interface RequestOrderTransferWorkflowInput {
  orderId: string
  customerId: string
  loggedInUser: string

  description?: string
  internalNote?: string
}
