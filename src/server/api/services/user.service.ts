import { UpdateUser } from '@/libs/schema/user.schema'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { UtilsService } from './utils.service'

class UserService extends UtilsService {
  async getInformation(userId: string) {
    this.CheckAuth(userId)

    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        address: true,
        cart: true,
      },
    })

    if (!userInfo) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

    return userInfo
  }

  async updateInformation(userId: string, data: UpdateUser) {
    this.CheckAuth(userId)

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })

    return updatedUser
  }

  async updateImage(userId: string, image: string) {
    this.CheckAuth(userId)

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image,
      },
    })

    return updatedUser
  }
}

export default UserService
