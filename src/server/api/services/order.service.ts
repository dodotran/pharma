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
      const cart = await prisma.cart.deleteMany({
        where: {
          product_id: data.product_id,
        },
      })

      if (cart) {
        await prisma.product.update({
          where: {
            id: data.product_id,
          },
          data: {
            quantity: {
              decrement: data.quantity,
            },
          },
        })
      }
    }
  }

  async getHistoryOrder(userId: string) {
    this.CheckAuth(userId)

    const order = await prisma.order.findMany({
      where: {
        user_id: userId,
      },
      include: {
        product: {
          include: {
            category: true,
            trademark: true,
            unit: true,
            image: true,
          },
        },
        address: true,
        status: true,
        payment_method: true,
      },
    })

    return order
  }

  async updateStatusOrder(id: string, statusId: string, userId: string) {
    this.CheckAuth(userId)

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!order) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.order-not-found' })
    }

    await prisma.product.update({
      where: {
        id: order.product_id,
      },
      data: {
        quantity: {
          increment: order.quantity,
        },
      },
    })

    const statusOrder = await prisma.statusOrder.findUnique({
      where: {
        id: statusId,
      },
    })

    if (!statusOrder) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.status-order-not-found' })
    }

    const orderUpdate = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status_order_id: statusId,
      },
    })

    return orderUpdate
  }

  async getAllOrder(userId: string) {
    this.CheckAdmin(userId)

    const order = await prisma.order.findMany({
      include: {
        product: {
          include: {
            category: true,
            trademark: true,
            unit: true,
            image: true,
          },
        },
        address: {
          include: {
            province: true,
            district: true,
            ward: true,
          },
        },
        status: true,
        payment_method: true,
      },
    })

    return order
  }

  async getRevenueOrder(userId: string) {
    this.CheckAdmin(userId)

    const order = await prisma.order.findMany({
      include: {
        product: {
          include: {
            category: true,
            trademark: true,
            unit: true,
            image: true,
          },
        },
        address: {
          include: {
            province: true,
            district: true,
            ward: true,
          },
        },
        status: true,
        payment_method: true,
      },
    })

    let total = 0
    order.map((item) => {
      if (item.payment_method && item.payment_method.status === 'SUCCESS') {
        total = total + item.product.price * item.quantity
      }
    })

    return total
  }

  async getTotalOrderPending(userId: string) {
    this.CheckAdmin(userId)
    const order = await prisma.order.findMany({
      include: {
        product: {
          include: {
            category: true,
            trademark: true,
            unit: true,
            image: true,
          },
        },
        address: {
          include: {
            province: true,
            district: true,
            ward: true,
          },
        },
        status: true,
        payment_method: true,
      },
    })

    const orderPending = order.filter((item) => item?.payment_method?.status === 'PENDING')

    return orderPending.length
  }

  async finalOrder(id: string, userId: string) {
    this.CheckAdmin(userId)

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (!order) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.order-not-found' })
    }

    const orderUpdate = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status_order_id: 'clnq7yp8n0002wdekwpmedkdn',
      },
    })

    const payment_method = await prisma.paymentMethod.update({
      where: {
        order_id: id,
      },
      data: {
        status: 'SUCCESS',
      },
    })

    return { ...orderUpdate, payment_method }
  }

  async getOrderByMonth(userId: string) {
    this.CheckAdmin(userId)

    const dateMapper = [
      {
        title: 'Tháng 1',
        startDate: new Date('2023-01-01T00:00:00.000Z'),
        endDate: new Date('2023-01-31T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 2',
        startDate: new Date('2023-02-01T00:00:00.000Z'),
        endDate: new Date('2023-02-28T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 3',
        startDate: new Date('2023-03-01T00:00:00.000Z'),
        endDate: new Date('2023-03-31T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 4',
        startDate: new Date('2023-04-01T00:00:00.000Z'),
        endDate: new Date('2023-04-30T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 5',
        startDate: new Date('2023-05-01T00:00:00.000Z'),
        endDate: new Date('2023-05-31T00:00:00.000Z'),
        total: 0,
      },

      {
        title: 'Tháng 6',
        startDate: new Date('2023-06-01T00:00:00.000Z'),
        endDate: new Date('2023-06-30T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 7',
        startDate: new Date('2023-07-01T00:00:00.000Z'),
        endDate: new Date('2023-07-31T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 8',
        startDate: new Date('2023-08-01T00:00:00.000Z'),
        endDate: new Date('2023-08-31T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 9',
        startDate: new Date('2023-09-01T00:00:00.000Z'),
        endDate: new Date('2023-09-30T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 10',
        startDate: new Date('2023-10-01T00:00:00.000Z'),
        endDate: new Date('2023-10-31T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 11',
        startDate: new Date('2023-11-01T00:00:00.000Z'),
        endDate: new Date('2023-11-30T00:00:00.000Z'),
        total: 0,
      },
      {
        title: 'Tháng 12',
        startDate: new Date('2023-12-01T00:00:00.000Z'),
        endDate: new Date('2023-12-31T00:00:00.000Z'),
        total: 0,
      },
    ]

    const results = await Promise.all(
      dateMapper.map(async (item) => {
        const res = await prisma.order.findMany({
          where: {
            createdAt: {
              gte: item.startDate,
              lte: item.endDate,
            },
          },
          include: {
            product: true,
            payment_method: true,
          },
        })

        const total = res
          .map((order) => {
            if (order.payment_method?.status !== 'SUCCESS') return 0
            else return order.product.price * order.quantity
          })
          .reduce((a, b) => a + b, 0)

        const result = {
          ...item,
          total: total,
        }

        return result
      }),
    )

    // The 'results' array now contains the processed data for all items.
    return results
  }
}

export default OrderService
