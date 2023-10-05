import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import UserService from '../services/user.service'

const userService = new UserService()

export const userRouter = createTRPCRouter({
  get: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/user' } })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return userService.getInformation(ctx.session.user.id)
    }),
})
