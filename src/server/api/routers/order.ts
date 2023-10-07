import {
  CategorySchema,
  CategorySchemaUpdate,
  CreateCategorySchema,
} from '@/libs/schema/category.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { User } from 'next-auth'
import { z } from 'zod'
import OrderService from '../services/order.service'

const orderService = new OrderService()

export const orderRouter = createTRPCRouter({
  getStatus: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/status-order' } })
    .input(z.void())
    .output(z.any())
    .query(() => {
      return orderService.getAll()
    }),
  createStatus: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/status-order' } })
    .input(CreateCategorySchema)
    .output(CategorySchema)
    .mutation(({ input, ctx }) => {
      return orderService.create(input, ctx.session.user as User)
    }),
  updateStatus: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/status-order/:id' } })
    .input(CategorySchemaUpdate)
    .output(z.any())
    .mutation(({ input, ctx }) => {
      return orderService.update(input, ctx.session.user as User)
    }),
  deleteStatus: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/status-order/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return orderService.delete(input.id, ctx.session.user as User)
    }),
  getStatusById: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/status-order/:id' } })
    .input(z.object({ id: z.string() }))
    .output(z.any())
    .query(({ input }) => {
      return orderService.getById(input.id)
    }),
})
