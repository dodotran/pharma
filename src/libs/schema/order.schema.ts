import { z } from 'zod'

export const CreateOrderSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
  address_id: z.string(),
  is_paid: z.boolean(),
  status_order_id: z.string(),
  payment_source: z.string(),
  order_payment_id: z.string(),
  payment_id: z.string(),
  status: z.enum(['PENDING', 'SUCCESS', 'FAILED']),
  payer_id: z.string(),
})

export const UpdateStatusOrderSchema = z.object({
  statusId: z.string(),
})

export type CreateOrderType = z.infer<typeof CreateOrderSchema>
export type UpdateStatusOrderType = z.infer<typeof UpdateStatusOrderSchema>
