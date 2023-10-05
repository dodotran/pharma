import { createProductSchema } from '@/libs/schema/product.schema'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { ProductSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import ProductService from '../services/product.service'

const productService = new ProductService()

export const productRoute = createTRPCRouter({
  getAll: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/product' } })
    .input(z.void())
    .output(z.array(ProductSchema))
    .query(() => {
      return productService.getAll()
    }),
  byId: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/product/:id' } })
    .input(z.object({ id: z.string().min(1) }))
    .output(ProductSchema.nullable())
    .query(({ input }) => {
      return productService.byId(input.id)
    }),
  createProduct: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/product' } })
    .input(createProductSchema)
    .output(ProductSchema)
    .mutation(({ input, ctx }) => {
      return productService.create(input, ctx.session?.user.id as string)
    }),
})