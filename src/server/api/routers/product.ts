import {
  ImageProductSchema,
  ProductSchemaZod,
  UploadImageSchema,
  createProductSchema,
} from '@/libs/schema/product.schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import ProductService from '../services/product.service'

const productService = new ProductService()

export const productRoute = createTRPCRouter({
  getAll: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/product' } })
    .input(z.void())
    .output(z.any())
    .query(() => {
      return productService.getAll()
    }),
  byId: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/product/:id' } })
    .input(z.object({ id: z.string().min(1) }))
    .output(ProductSchemaZod.nullable())
    .query(({ input }) => {
      return productService.byId(input.id)
    }),
  createProduct: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/product' } })
    .input(createProductSchema)
    .output(ProductSchemaZod)
    .mutation(({ input, ctx }) => {
      return productService.create(input, ctx.session?.user.id as string)
    }),
  uploadImage: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/product/upload-image' } })
    .input(UploadImageSchema)
    .output(ImageProductSchema)
    .mutation(({ input, ctx }) => {
      return productService.uploadImage(input, ctx.session?.user.id as string)
    }),
})
