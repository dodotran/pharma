import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import WardsService from '../services/wards.service'

const wardsService = new WardsService()

export const wardsRouter = createTRPCRouter({
  get: publicProcedure
    .meta({ openapi: { method: 'GET', path: '/wards' } })
    .input(z.void())
    .output(z.any())
    .query(({ input }) => {
      return wardsService.get()
    }),
})
