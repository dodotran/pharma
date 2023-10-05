import {
  ChangePasswordInputSchema,
  ForgotPasswordInputSchema,
  ResetPasswordInputSchema,
  SignUpInputSchema,
} from '@/libs/schema'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import AuthService from '../services/auth.service'

const authService = new AuthService()

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/sign-up' } })
    .input(SignUpInputSchema)
    .output(z.any())
    .mutation(({ input }) => {
      return authService.signUp(input)
    }),
  resetPassword: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/reset-password' } })
    .input(ResetPasswordInputSchema)
    .output(z.string())
    .mutation(({ input }) => {
      return authService.resetPassword(input.password, input.token)
    }),
  verify: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/verify' } })
    .input(z.object({ token: z.string() }))
    .output(z.string())
    .mutation(({ input }) => {
      return authService.verify(input.token)
    }),
  resendVerifyEmail: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/resend-email' } })
    .input(z.object({ email: z.string().email(), language: z.enum(['en', 'vi']).default('vi') }))
    .output(z.string())
    .mutation(({ input }) => {
      return authService.resendVerifyEmail(input.email, input.language)
    }),
  changePassword: protectedProcedure
    .meta({ openapi: { method: 'PUT', path: '/change-password' } })
    .input(ChangePasswordInputSchema)
    .output(z.any())
    .mutation(({ input, ctx }) => {
      return authService.changePassword(
        input['old-password'],
        input['new-password'],
        ctx.session.user.id,
      )
    }),
  forgotPassword: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/forgot-password' } })
    .input(ForgotPasswordInputSchema)
    .output(z.string())
    .mutation(({ input }) => {
      return authService.forgotPassword(input.email, input.language)
    }),
})
