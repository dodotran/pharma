import { CreateCartSchema } from '@/libs/schema/cart.schema'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { CartSchema } from 'prisma/generated/zod'
import { z } from 'zod'
import CartService from '../services/cart.service'

const cartService = new CartService()

export const cartRouter = createTRPCRouter({
  getAll: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/cart' } })
    .input(z.void())
    .output(z.array(CartSchema))
    .query(({ ctx }) => {
      return cartService.getAllCarts(ctx.session?.user.id as string)
    }),
  create: protectedProcedure
    .meta({ openapi: { method: 'POST', path: '/cart' } })
    .input(CreateCartSchema)
    .output(CartSchema.or(z.string()))
    .mutation(({ input, ctx }) => {
      return cartService.addToCart(ctx.session?.user.id as string, input.product_id)
    }),
  delete: protectedProcedure
    .meta({ openapi: { method: 'DELETE', path: '/cart/:id' } })
    .input(CreateCartSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return cartService.deleteCart(ctx.session?.user.id as string, input.product_id)
    }),
  incrementCart: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/cart-increment/:id' } })
    .input(CreateCartSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return cartService.incrementCart(ctx.session?.user.id as string, input.product_id)
    }),
  decrementCart: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/cart-decrement/:id' } })
    .input(CreateCartSchema)
    .output(z.string())
    .mutation(({ input, ctx }) => {
      return cartService.decrementCart(ctx.session?.user.id as string, input.product_id)
    }),
})
