import { z } from 'zod'

export const CartSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateCartSchema = CartSchema.omit({
  id: true,
  user_id: true,
  createdAt: true,
  updatedAt: true,
  quantity: true,
})

export const UpdateCartSchema = CartSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export type CreateCart = z.infer<typeof CreateCartSchema>
export type UpdateCart = z.infer<typeof UpdateCartSchema>
export type CartSchemaType = z.infer<typeof CartSchema>
