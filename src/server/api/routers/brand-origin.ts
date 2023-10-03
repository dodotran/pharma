import { BrandSchema, BrandSchemaUpdate, ListBrandSchema } from '@/libs/schema/brand.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { User } from 'next-auth'
import { z } from 'zod'
import BrandOriginService from '../services/brand-origin.service'

const brandService = new BrandOriginService()

export const brandOriginRouter = createTRPCRouter({
  get: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/' } })
    .input(z.void())
    .output(ListBrandSchema)
    .query(() => {
      return brandService.getAll()
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .output(BrandSchema)
    .mutation(({ input, ctx }) => {
      return brandService.create(input, ctx.session.user as User)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/:id' } })
    .input(BrandSchemaUpdate)
    .output(BrandSchema)
    .mutation(({ input, ctx }) => {
      return brandService.update(input, ctx.session.user as User)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return brandService.delete(input.id, ctx.session.user as User)
    }),
})
