import { UpdateUserSchema } from '@/libs/schema/user.schema'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import UserService from '../services/user.service'

const userService = new UserService()

export const userRouter = createTRPCRouter({
  byId: protectedProcedure
    .meta({ openapi: { method: 'GET', path: '/user/:id' } })
    .input(z.void())
    .output(z.any())
    .query(({ ctx }) => {
      return userService.getInformation(ctx.session.user.id)
    }),
  update: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/user' } })
    .input(UpdateUserSchema)
    .output(z.any())
    .mutation(({ input, ctx }) => {
      return userService.updateInformation(ctx.session.user.id, input)
    }),
  updateImage: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/user/image' } })
    .input(
      z.object({
        image: z.string(),
      }),
    )
    .output(z.any())
    .mutation(({ input, ctx }) => {
      return userService.updateImage(ctx.session.user.id, input.image)
    }),
})
