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

export const InputCartSchema = z.object({
  quantity: z.number(),
})

const ImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  product_id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const UnitSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  unit_id: z.string(),
  expired_date: z.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  category: CategorySchema.or(z.null()),
  unit: UnitSchema.or(z.null()),
  image: z.array(ImageSchema),
})

export const CartProductSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  product: ProductSchema.or(z.null()),
})

export type CreateCart = z.infer<typeof CreateCartSchema>
export type UpdateCart = z.infer<typeof UpdateCartSchema>
export type CartSchemaType = z.infer<typeof CartSchema>
export type InputCartSchemaType = z.infer<typeof InputCartSchema>
export type CartProductSchemaType = z.infer<typeof CartProductSchema>
