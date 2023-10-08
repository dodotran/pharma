import { createTRPCRouter } from '@/server/api/trpc'
import { addressRouter, authRouter, categoryRouter, productRoute, unitRouter } from './routers'
import { cartRouter } from './routers/cart'
import { orderRouter } from './routers/order'
import { trademarkRouter } from './routers/trademark'
import { userRouter } from './routers/user'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  category: categoryRouter,
  unit: unitRouter,
  product: productRoute,
  cart: cartRouter,
  user: userRouter,
  order: orderRouter,
  trademark: trademarkRouter,
  address: addressRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
