import {
  CategorySchemaUpdate,
  CategorySchema as CreateCategorySchema,
  ListCategorySchema,
} from '@/libs/schema/category.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { User } from 'next-auth'
import { CategorySchema } from 'prisma/generated/zod'

import { z } from 'zod'
import CategoryService from '../services/category.service'

const categoryService = new CategoryService()

export const categoryRouter = createTRPCRouter({
  get: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/category' } })
    .input(z.void())
    .output(ListCategorySchema)
    .query(() => {
      return categoryService.getAll()
    }),
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/category' } })
    .input(CreateCategorySchema)
    .output(CategorySchema)
    .mutation(({ input, ctx }) => {
      return categoryService.create(input, ctx.session.user as User)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/category/:id' } })
    .input(CategorySchemaUpdate)
    .output(z.any())
    .mutation(({ input, ctx }) => {
      return categoryService.update(input, ctx.session.user as User)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/category/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return categoryService.delete(input.id, ctx.session.user as User)
    }),
  byId: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/category/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.any())
    .query(({ input }) => {
      return categoryService.getById(input.id)
    }),
  getProductByCategory: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/category-product/:id/' } })
    .input(z.object({ id: z.string() }))
    .output(z.any())
    .query(({ input }) => {
      return categoryService.getProductByCategory(input.id)
    }),
})
