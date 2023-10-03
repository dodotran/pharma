import { CategorySchemaUpdate, ListCategorySchema } from '@/libs/schema/category.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { User } from 'next-auth'
import { CategorySchema } from 'prisma/generated/zod'
import { z } from 'zod'
import CategoryService from '../services/category.service'

const categoryService = new CategoryService()

export const categoryRouter = createTRPCRouter({
  get: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/' } })
    .input(z.void())
    .output(ListCategorySchema)
    .query(() => {
      return categoryService.getAll()
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .output(CategorySchema)
    .mutation(({ input, ctx }) => {
      return categoryService.create(input, ctx.session.user as User)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/:id' } })
    .input(CategorySchemaUpdate)
    .output(CategorySchema)
    .mutation(({ input, ctx }) => {
      return categoryService.update(input, ctx.session.user as User)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return categoryService.delete(input.id, ctx.session.user as User)
    }),
})
