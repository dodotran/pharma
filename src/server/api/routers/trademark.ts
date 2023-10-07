import {
  TrademarkCreateSchema,
  TrademarkSchema,
  TrademarkUpdateSchema,
} from '@/libs/schema/trademark'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import TrademarkService from '../services/trademark.service'

const trademarkService = new TrademarkService()

export const trademarkRouter = createTRPCRouter({
  get: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/trademark' } })
    .input(z.void())
    .output(z.any())
    .query(() => {
      return trademarkService.getAll()
    }),
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/trademark' } })
    .input(TrademarkCreateSchema)
    .output(TrademarkSchema)
    .mutation(({ input, ctx }) => {
      return trademarkService.create(input, ctx.session.user.id)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/trademark' } })
    .input(TrademarkUpdateSchema)
    .output(TrademarkSchema)
    .mutation(({ input, ctx }) => {
      return trademarkService.update(input, ctx.session.user.id)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/trademark' } })
    .input(z.object({ id: z.string() }))
    .output(z.any())
    .mutation(({ input, ctx }) => {
      return trademarkService.delete(input.id, ctx.session.user.id)
    }),
})
