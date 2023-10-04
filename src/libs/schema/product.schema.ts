import { ProductSchema, UnitSchema } from 'prisma/generated/zod'
import { z } from 'zod'

export const createProductSchema = ProductSchema.omit({
  id: true,
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

export type CreateProduct = z.infer<typeof createProductSchema>
export type CreateUnit = z.infer<typeof createUnitSchema>
export type UpdateUnit = z.infer<typeof updateUnitSchema>
