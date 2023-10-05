import { ProductSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string().min(1),
})

export const UnitSchemaProduct = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  Product: z.array(ProductSchema),
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
export type CategorySchemaUpdateType = z.infer<typeof CategorySchemaUpdate>
export type ListCategorySchemaType = z.infer<typeof ListCategorySchema>
export type UnitSchemaProductType = z.infer<typeof UnitSchemaProduct>
