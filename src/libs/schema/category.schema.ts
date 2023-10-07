import { z } from 'zod'
import { ProductSchema } from './product.schema'

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const UnitSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateCategorySchema = z.object({
  name: z.string(),
})

export const UnitSchemaProduct = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  product: z.array(ProductSchema),
})

export const CategorySchemaUpdate = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
})

export const Category = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ListCategorySchema = z.array(Category)

export type CategorySchemaType = z.infer<typeof CategorySchema>
export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>
export type CategorySchemaUpdateType = z.infer<typeof CategorySchemaUpdate>
export type ListCategorySchemaType = z.infer<typeof ListCategorySchema>
export type UnitSchemaProductType = z.infer<typeof UnitSchemaProduct>
export type UnitSchemaType = z.infer<typeof UnitSchema>
