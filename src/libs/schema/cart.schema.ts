import { CartSchema } from 'prisma/generated/zod'
import { z } from 'zod'

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
