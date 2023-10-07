import { CategorySchemaUpdateType, CreateCategorySchemaType } from '@/libs/schema/category.schema'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'
import { UtilsService } from './utils.service'

class OrderService extends UtilsService {
  async getAll() {
    const statusOrder = await prisma.statusOrder.findMany()

    return statusOrder
  }

  async create(data: CreateCategorySchemaType, user: User) {
    await this.CheckAdmin(user.id)

    const statusOrder = await prisma.statusOrder.create({
      data,
    })

    return statusOrder
  }

  async update(data: CategorySchemaUpdateType, user: User) {
    await this.CheckAdmin(user.id)
    const { id, name } = data

    const statusOrder = await prisma.statusOrder.findUnique({
      where: {
        id,
      },
    })

    if (!statusOrder) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.status-order-not-found' })
    }

    const statusOrderUpdate = await prisma.statusOrder.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return statusOrderUpdate
  }

  async delete(id: string, user: User) {
    await this.CheckAdmin(user.id)

    const statusOrder = await prisma.statusOrder.findUnique({
      where: {
        id,
      },
    })

    if (!statusOrder) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.status-order-not-found' })
    }

    await prisma.statusOrder.delete({
      where: {
        id,
      },
    })

    return 'Delete success!'
  }

  async getById(id: string) {
    const statusOrder = await prisma.statusOrder.findUnique({
      where: {
        id,
      },
    })

    if (!statusOrder) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.status-order-not-found' })
    }

    return statusOrder
  }
}

export default OrderService
