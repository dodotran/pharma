import {
  CategorySchema,
  ImageProductSchema,
  ProductDetailSchema,
  ProductSchema,
  UnitSchema,
} from 'prisma/generated/zod'
import { z } from 'zod'

export const createProductSchema = z
  .object({
    status: z.enum(['DANG_BAN', 'HET_HANG', 'DUNG_BAN', 'DEN_HIEU_THUOC']),
    name: z.string().min(1),
    price: z.string().min(1),
    quantity: z.string().min(1),
    unit_id: z.string().min(1),
    expired_date: z.date(),
    category_id: z.string().min(1),
  })
  .merge(ProductDetailSchema.omit({ id: true, createdAt: true, updatedAt: true, product_id: true }))

export const updateProductSchema = ProductSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export const createUnitSchema = UnitSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const updateUnitSchema = UnitSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export const ProductSchemas = z
  .object({
    unit: UnitSchema,
    ProductDetail: z.array(ProductDetailSchema),
    image: z.array(ImageProductSchema),
    category: CategorySchema,
  })
  .merge(ProductSchema)

export const CreateProductDetailSchema = ProductDetailSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateProductDetailSchema = ProductDetailSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type CreateUnit = z.infer<typeof createUnitSchema>
export type UpdateUnit = z.infer<typeof updateUnitSchema>
export type CreateProductDetail = z.infer<typeof CreateProductDetailSchema>
export type UpdateProductDetail = z.infer<typeof UpdateProductDetailSchema>
