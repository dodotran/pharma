import { CategorySchemaType, CategorySchemaUpdateType } from '@/libs/schema/category.schema'
import { prisma } from '@/server/db'
import { User } from 'next-auth'
import { UtilsService } from './utils.service'

class BrandOriginService extends UtilsService {
  async getAll() {
    const brand = await prisma.brandOrigin.findMany()

    return brand
  }

  async get(id: string) {
    const brand = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    return brand
  }

  async create(data: CategorySchemaType, user: User) {
    await this.CheckAdmin(user.id)

    const brand = await prisma.brandOrigin.create({
      data,
    })

    return brand
  }

  async update(data: CategorySchemaUpdateType, user: User) {
    await this.CheckAdmin(user.id)

    const { id, name } = data

    const brandOrigin = await prisma.brandOrigin.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return brandOrigin
  }

  async delete(id: string, user: User) {
    await this.CheckAdmin(user.id)

    await prisma.brandOrigin.delete({
      where: {
        id,
      },
    })

    return 'Delete success'
  }
}

export default BrandOriginService
