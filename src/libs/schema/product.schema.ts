import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.string(),
  unit_id: z.string(),
  description: z.string(),
  short_description: z.string(),
  quantity: z.string(),
  expiryProduct: z.string(),
  brand_origin_id: z.string(),
  category_id: z.string(),
  brand_name_id: z.string(),
})

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  price: z.number().min(1),
  unit_id: z.string(),
  description: z.string(),
  short_description: z.string(),
  quantity: z.number().min(1),
  expiryProduct: z.date(),
  brand_origin_id: z.string(),
  category_id: z.string(),
  brand_name_id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type CreateProductSchemaType = z.infer<typeof createProductSchema>
