import { TrademarkCreate, TrademarkUpdate } from '@/libs/schema/trademark'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { UtilsService } from './utils.service'

class TrademarkService extends UtilsService {
  async getAll() {
    const trademarks = await prisma.trademark.findMany({
      include: {
        product: true,
      },
    })

    return trademarks
  }

  async byId(id: string) {
    const trademark = await prisma.trademark.findUnique({
      where: { id },
      include: {
        product: true,
      },
    })

    if (!trademark) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Trademark with id ${id} not found`,
      })
    }

    return trademark
  }

  async create(data: TrademarkCreate, userId: string) {
    this.CheckAdmin(userId)

    const trademark = await prisma.trademark.create({
      data,
    })

    return trademark
  }

  async update(data: TrademarkUpdate, userId: string) {
    this.CheckAdmin(userId)

    const trademark = await prisma.trademark.findUnique({
      where: { id: data.id },
    })

    if (!trademark) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Trademark with id ${data.id} not found`,
      })
    }

    const trademarkUpdate = await prisma.trademark.update({
      where: { id: data.id },
      data,
    })

    return trademarkUpdate
  }

  async delete(id: string, userId: string) {
    this.CheckAdmin(userId)

    const trademark = await prisma.trademark.findUnique({
      where: { id },
    })

    if (!trademark) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Trademark with id ${id} not found`,
      })
    }

    await prisma.trademark.delete({
      where: { id },
    })

    return 'Delete success'
  }
}

export default TrademarkService
