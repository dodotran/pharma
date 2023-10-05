import { createTRPCRouter } from '@/server/api/trpc'
import { authRouter, categoryRouter, productRoute, unitRouter, wardsRouter } from './routers'
import { cartRouter } from './routers/cart'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  wards: wardsRouter,
  category: categoryRouter,
  unit: unitRouter,
  product: productRoute,
  cart: cartRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter