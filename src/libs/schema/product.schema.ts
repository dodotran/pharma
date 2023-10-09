import { z } from 'zod'

export const UnitSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ImageProductSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  quantity: z.string(),
  expired_date: z.date(),
  unit: UnitSchema,
  category: UnitSchema,
  image: ImageProductSchema,
  trademark_id: z.string(),
  status: z.enum(['DANG_BAN', 'HET_HANG', 'DUNG_BAN', 'DEN_HIEU_THUOC']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const ProductDetailSchema = z.object({
  id: z.string(),
  product_id: z.string(),
  description: z.string(),
  short_description: z.string(),
  ingredient: z.string(),
  how_to_use: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createProductSchema = z
  .object({
    status: z.enum(['DANG_BAN', 'HET_HANG', 'DUNG_BAN', 'DEN_HIEU_THUOC']),
    name: z.string().min(1),
    price: z.string().min(1),
    quantity: z.string().min(1),
    unit_id: z.string().min(1),
    expired_date: z.date(),
    category_id: z.string().min(1),
    trademark_id: z.string().min(1),
  })
  .merge(ProductDetailSchema.omit({ id: true, createdAt: true, updatedAt: true, product_id: true }))

export const updateProductSchema = ProductSchema.omit({
  createdAt: true,
  updatedAt: true,
})

export const createUnitSchema = z.object({
  name: z.string().min(1),
})

export const updateUnitSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
})

export const ProductSchemas = z
  .object({
    unit: UnitSchema,
    ProductDetail: z.array(ProductDetailSchema),
    image: z.array(ImageProductSchema),
    category: UnitSchema,
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

export const UploadImageSchema = z.object({
  product_id: z.string().min(1),
  url: z.string().min(1),
})

export const statusSchema = z.enum(['DANG_BAN', 'HET_HANG', 'DUNG_BAN', 'DEN_HIEU_THUOC'])
export const ProductSchemaZod = z.object({
  status: statusSchema,
  id: z.string().cuid(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int(),
  unit_id: z.string(),
  expired_date: z.coerce.date(),
  category_id: z.string(),
  trademark_id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof createProductSchema>
export type UpdateProduct = z.infer<typeof updateProductSchema>
export type CreateUnit = z.infer<typeof createUnitSchema>
export type UpdateUnit = z.infer<typeof updateUnitSchema>
export type CreateProductDetail = z.infer<typeof CreateProductDetailSchema>
export type UpdateProductDetail = z.infer<typeof UpdateProductDetailSchema>
export type ImageProductSchema = z.infer<typeof ImageProductSchema>
export type ProductSchemaType = z.infer<typeof ProductSchema>
export type ProductDetailSchemaType = z.infer<typeof ProductDetailSchema>
export type ProductSchemasType = z.infer<typeof ProductSchemas>
export type UploadImageSchemaType = z.infer<typeof UploadImageSchema>
