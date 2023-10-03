import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'

export class UtilsService {
  async CheckAdmin(id: string) {
    const userData = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (userData) {
      if (userData.role !== 'ADMIN') {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'error.unauthorized',
        })
      }
    }
  }
}
