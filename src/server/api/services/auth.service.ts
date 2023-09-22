import { SignUpInputSchema } from '@/libs/schema'
import MailUtils from '@/libs/utils/mail'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import * as argon2 from 'argon2'
import { nanoid } from 'nanoid'
import { z } from 'zod'

const ONE_DAY = 24 * 60 * 60 * 1000

class AuthService {
  async signUp(userInfo: z.infer<typeof SignUpInputSchema>) {
    const { email, password, name, ...createUserData } = userInfo

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'error.email_conflict',
      })
    } else {
      const hash = await argon2.hash(password as string)
      const token = nanoid()
      const expires = new Date(Date.now() + ONE_DAY * 30)
      try {
        const [user] = await prisma.$transaction([
          prisma.user.create({
            data: {
              ...createUserData,
              email,
              name,
              password: hash,
            },
          }),
          prisma.verificationToken.create({
            data: {
              identifier: email,
              token,
              expires,
            },
          }),
        ])

        await MailUtils.getInstance().sendVerifyMail(email, token, name, 'jp')

        const { password: _, ...userWithoutPassword } = user

        return userWithoutPassword
      } catch (error) {
        console.log(error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
        })
      }
    }
  }

  /**
   * This function resets a user's password by validating a reset password token, hashing the new
   * password, and updating the user's password in the database.
   * @param {string} password - The new password that the user wants to set.
   * @param {string} token - The token parameter is a string that represents a unique identifier for a
   * password reset request. It is used to verify the authenticity of the request and to ensure that the
   * user is authorized to reset their password.
   * @returns a string message "Update password success!" after updating the user's password and deleting
   * the password reset token from the database.
   */
  async resetPassword(password: string, token: string) {
    const checkToken = await this.validateResetPasswordToken(token)

    const hashPassword = await argon2.hash(password)
    try {
      await prisma.$transaction([
        prisma.user.update({
          where: {
            id: checkToken.user_id,
          },
          data: {
            password: hashPassword,
          },
        }),
        prisma.passwordReset.delete({
          where: {
            user_id: checkToken.user_id,
          },
        }),
      ])
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'error.internal_server_error',
      })
    }

    return 'Update password success!'
  }

  /**
   * This function validates a reset password token and throws an error if the token is invalid or
   * expired.
   * @param {string} token - The token is a string parameter that represents a unique identifier for a
   * password reset request. It is used to retrieve the corresponding password reset record from the
   * database and validate its expiration time.
   * @returns The function `validateResetPasswordToken` returns the `checkToken` object if it exists and
   * is valid. If the token is invalid or expired, it throws a `TRPCError` with an error code of
   * `UNAUTHORIZED` and a message of `error.invalid_token`.
   */
  async validateResetPasswordToken(token: string) {
    const checkToken = await prisma.passwordReset.findUnique({
      where: {
        token,
      },
    })

    if (!checkToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.invalid_token',
      })
    }

    const updatedAt = +new Date(checkToken.updated_at)
    const timeDifferenceInMilliseconds = Date.now() - updatedAt

    if (timeDifferenceInMilliseconds >= ONE_DAY) {
      await prisma.passwordReset.delete({
        where: {
          token: token,
        },
      })

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.invalid_token',
      })
    }

    return checkToken
  }

  /**
   * This function verifies a user's email by updating their emailVerified field and deleting the
   * verification token from the database.
   * @param {string} token - The token parameter is a string that represents a verification token that is
   * used to verify a user's email address.
   * @returns the string 'ok!' after updating the emailVerified field in the database and deleting the
   * verification token.
   */
  async verify(token: string) {
    const checkToken = await this.validateVerifyToken(token)

    try {
      await prisma.$transaction([
        prisma.user.update({
          where: {
            email: checkToken.identifier,
          },
          data: {
            emailVerified: new Date(),
          },
        }),
        prisma.verificationToken.delete({
          where: {
            token,
          },
        }),
      ])
    } catch (error) {
      console.log('verify error', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'error.internal_server_error',
      })
    }

    return 'ok!'
  }

  async validateVerifyToken(token: string) {
    const checkToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    })

    if (!checkToken) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.invalid_token',
      })
    }

    if (new Date(checkToken.expires) < new Date()) {
      await prisma.verificationToken.delete({
        where: {
          token: token,
        },
      })

      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.invalid_token',
      })
    }

    return checkToken
  }

  async resendVerifyEmail(email: string, language: string) {
    const checkEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!checkEmail) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.user_not_found',
      })
    }

    if (checkEmail?.emailVerified) {
      return 'Email is verified!'
    }

    const checkVerifyToken = await prisma.verificationToken.findFirst({
      where: { identifier: email },
    })

    const expires = new Date(Date.now() + ONE_DAY * 30)

    if (!checkVerifyToken) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
      })
    }

    await prisma.verificationToken.updateMany({
      where: { identifier: email },
      data: {
        expires,
      },
    })

    await MailUtils.getInstance().sendVerifyMail(
      email,
      checkVerifyToken.token,
      checkEmail.name as string,
      'en',
    )
    return 'ok!'
  }

  async changePassword(password: string, newPassword: string, userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })
    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.error_user_not_found',
      })
    }
    const isVerify = await argon2.verify(user.password as string, password)
    if (isVerify) {
      const hashNewPassword = await argon2.hash(newPassword)
      const userChangePassword = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashNewPassword,
        },
      })
      return userChangePassword
    } else {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'error.incorrect_password',
      })
    }
  }
}

export default AuthService
