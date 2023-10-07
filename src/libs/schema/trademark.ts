import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  quantity: z.string(),
  unit_id: z.string(),
  expired_date: z.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  status: z.enum(['DANG_BAN', 'HET_HANG', 'DUNG_BAN', 'DEN_HIEU_THUOC']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const TrademarkSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  country: z.string(),
  introduce: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const TrademarkListSchema = z.array(TrademarkSchema)

export const TrademarkCreateSchema = z.object({
  name: z.string().min(1),
  image: z.string(),
  country: z.string().min(1),
  introduce: z.string().min(1),
})

export const TrademarkUpdateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  image: z.string().min(1),
  country: z.string().min(1),
  introduce: z.string().min(1),
})

export const TrademarkProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  introduce: z.string(),
  country: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  products: z.array(ProductSchema),
})

export type Trademark = z.infer<typeof TrademarkSchema>
export type TrademarkList = z.infer<typeof TrademarkListSchema>
export type TrademarkCreate = z.infer<typeof TrademarkCreateSchema>
export type TrademarkUpdate = z.infer<typeof TrademarkUpdateSchema>
export type TrademarkProduct = z.infer<typeof TrademarkProductSchema>
