import { UpdateUser } from '@/libs/schema/user.schema'
import { prisma } from '@/server/db'
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
        Cart: true,
      },
    })

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
}

export default UserService
