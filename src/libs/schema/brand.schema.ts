import { z } from 'zod'

export const BrandSchema = z.object({
  name: z.string().min(1),
})

export const BrandSchemaUpdate = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
})

export const Brand = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ListBrandSchema = z.array(Brand)

export type BrandSchemaType = z.infer<typeof BrandSchema>
export type BrandSchemaUpdateType = z.infer<typeof BrandSchemaUpdate>
export type ListBrandSchemaType = z.infer<typeof ListBrandSchema>
