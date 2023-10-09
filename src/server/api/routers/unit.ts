import { CategorySchema, CategorySchemaUpdate } from '@/libs/schema/category.schema'
import { createUnitSchema } from '@/libs/schema/product.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { User } from 'next-auth'
import { z } from 'zod'
import UnitService from '../services/unit.service'

const unitService = new UnitService()

export const unitRouter = createTRPCRouter({
  get: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/unit' } })
    .input(z.void())
    .output(z.any())
    .query(() => {
      return unitService.getAll()
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .output(createUnitSchema)
    .mutation(({ input, ctx }) => {
      return unitService.create(input, ctx.session.user as User)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/unit/:id' } })
    .input(CategorySchemaUpdate)
    .output(CategorySchema)
    .mutation(({ input, ctx }) => {
      return unitService.update(input, ctx.session.user as User)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/unit:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return unitService.delete(input.id, ctx.session.user as User)
    }),
  byId: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/unit/:id' } })
    .input(z.object({ id: z.string() }))
    .output(CategorySchema)
    .query(({ input }) => {
      return unitService.get(input.id)
    }),
})
