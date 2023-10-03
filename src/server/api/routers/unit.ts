import { BrandSchema, BrandSchemaUpdate, ListBrandSchema } from '@/libs/schema/brand.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { User } from 'next-auth'
import { z } from 'zod'
import UnitService from '../services/unit.service'

const unitService = new UnitService()

export const unitRouter = createTRPCRouter({
  get: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/' } })
    .input(z.void())
    .output(ListBrandSchema)
    .query(() => {
      return unitService.getAll()
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .output(BrandSchema)
    .mutation(({ input, ctx }) => {
      return unitService.create(input, ctx.session.user as User)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/:id' } })
    .input(BrandSchemaUpdate)
    .output(BrandSchema)
    .mutation(({ input, ctx }) => {
      return unitService.update(input, ctx.session.user as User)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return unitService.delete(input.id, ctx.session.user as User)
    }),
})
