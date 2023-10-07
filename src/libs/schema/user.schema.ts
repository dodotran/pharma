import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  createdAt: z.date(),
  updatedAt: z.date(),
  emailVerified: z.date(),
  image: z.string(),
  sex: z.string(),
  date_of_birth: z.date(),
})

export const updateUser = UserSchema.omit({
  updatedAt: true,
  createdAt: true,
  id: true,
  email: true,
  role: true,
})

export type UpdateUser = z.infer<typeof updateUser>
export type UserSchemaType = z.infer<typeof UserSchema>
