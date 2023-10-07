import { CategorySchemaUpdateType } from '@/libs/schema/category.schema'
import { CreateUnit } from '@/libs/schema/product.schema'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'
import { UtilsService } from './utils.service'

class UnitService extends UtilsService {
  async getAll() {
    const unit = await prisma.unit.findMany({
      include: {
        product: true,
      },
    })

    return unit
  }

  async get(id: string) {
    const unit = await prisma.unit.findUnique({
      where: {
        id,
      },
    })

    if (!unit) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.unit-not-found',
      })
    }

    return unit
  }

  async create(data: CreateUnit, user: User) {
    await this.CheckAdmin(user.id)

    const unit = await prisma.unit.create({
      data,
    })

    return unit
  }

  async update(data: CategorySchemaUpdateType, user: User) {
    await this.CheckAdmin(user.id)
    const { id, name } = data

    const unit = await prisma.unit.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    if (!unit) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.unit-not-found',
      })
    }

    return unit
  }

  async delete(id: string, user: User) {
    await this.CheckAdmin(user.id)

    const unit = await prisma.unit.findUnique({
      where: {
        id,
      },
    })

    if (!unit) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.unit-not-found',
      })
    }
    await prisma.unit.delete({
      where: {
        id,
      },
    })

    return 'Delete success'
  }

  async byId(id: string) {
    const unit = await prisma.unit.findUnique({
      where: {
        id,
      },
    })

    if (!unit) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.unit-not-found',
      })
    }

    return unit
  }
}

export default UnitService
