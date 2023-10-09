import { string, z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  role: z.enum(['ADMIN', 'USER']),
  createdAt: z.date(),
  updatedAt: z.date(),
  emailVerified: z.date(),
  image: z.string(),
  sex: z.string(),
  date_of_birth: z.date(),
})

export const UpdateUserSchema = z.object({
  name: z.string().min(1),
  date_of_birth: z.date(),
  sex: string().min(1),
})
export const UpdateImageUserSchema = z.object({
  image: z.string(),
})

export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type UserSchemaType = z.infer<typeof UserSchema>
export type UpdateImageUserType = z.infer<typeof UpdateImageUserSchema>
