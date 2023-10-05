import { UserSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const updateUser = UserSchema.omit({
  updatedAt: true,
  createdAt: true,
  id: true,
  email: true,
  role: true,
})

export type UpdateUser = z.infer<typeof updateUser>
