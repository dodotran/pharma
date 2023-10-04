import { createProductSchema } from '@/libs/schema/product.schema'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import ProductService from '../services/product.service'

const productService = new ProductService()

export const productRoute = createTRPCRouter({
  getAll: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/' } })
    .input(z.void())
    .output(z.any())
    .query(() => {
      return productService.getAll()
    }),
  byId: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/:id' } })
    .input(z.object({ id: z.string().min(1) }))
    .output(z.any())
    .query(({ input }) => {
      return productService.byId(input.id)
    }),
  createProduct: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/' } })
    .input(createProductSchema)
    .output(z.any())
    .mutation(({ input }) => {
      return productService.create(input)
    }),
})
