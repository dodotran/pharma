import { createTRPCRouter } from '@/server/api/trpc'
import {
  authRouter,
  brandOriginRouter,
  brandRouter,
  categoryRouter,
  productRoute,
  unitRouter,
  wardsRouter,
} from './routers'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  wards: wardsRouter,
  brand: brandRouter,
  category: categoryRouter,
  unit: unitRouter,
  brandOrigin: brandOriginRouter,
  product: productRoute,
})

// export type definition of API
export type AppRouter = typeof appRouter
