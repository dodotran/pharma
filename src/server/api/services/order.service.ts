import { CategorySchemaUpdateType, CreateCategorySchemaType } from '@/libs/schema/category.schema'
import { CreateOrderType } from '@/libs/schema/order.schema'
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

  async createOrder(data: CreateOrderType, userId: string) {
    this.CheckAuth(userId)

    const dataOrder = {
      user_id: userId,
      product_id: data.product_id,
      quantity: data.quantity,
      address_id: data.address_id,
      is_paid: data.is_paid,
      status_order_id: data.status_order_id,
    }

    const order = await prisma.$transaction(async (tx) => {
      const order = await prisma.order.create({
        data: dataOrder,
      })

      if (order) {
        const paymentMethodData = {
          order_id: order.id,
          payment_source: data.payment_source,
          order_payment_id: data.order_payment_id,
          payment_id: data.payer_id,
          status: data.status,
          payer_id: data.payer_id,
        }

        const paymentMethod = await prisma.paymentMethod.create({
          data: paymentMethodData,
        })

        return paymentMethod
      }

      return order
    })

    if (order) {
      await prisma.cart.deleteMany({
        where: {
          product_id: data.product_id,
        },
      })
    }
  }
}

export default OrderService
