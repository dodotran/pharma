import { CategorySchemaType, CategorySchemaUpdateType } from '@/libs/schema/category.schema'
import { prisma } from '@/server/db'
import { User } from 'next-auth'
import { UtilsService } from './utils.service'

class UnitService extends UtilsService {
  async getAll() {
    const unit = await prisma.unit.findMany()

    return unit
  }

  async get(id: string) {
    const unit = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    return unit
  }

  async create(data: CategorySchemaType, user: User) {
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

    return unit
  }

  async delete(id: string, user: User) {
    await this.CheckAdmin(user.id)

    await prisma.unit.delete({
      where: {
        id,
      },
    })

    return 'Delete success'
  }
}

export default UnitService
