import { CategorySchemaType, CategorySchemaUpdateType } from '@/libs/schema/category.schema'
import { prisma } from '@/server/db'
import { User } from 'next-auth'
import { UtilsService } from './utils.service'

class BrandService extends UtilsService {
  async getAll() {
    const brand = await prisma.brandName.findMany()

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

    const brand = await prisma.brandName.create({
      data,
    })

    return brand
  }

  async update(data: CategorySchemaUpdateType, user: User) {
    await this.CheckAdmin(user.id)

    const { id, name } = data

    const brandName = await prisma.brandName.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return brandName
  }

  async delete(id: string, user: User) {
    await this.CheckAdmin(user.id)

    await prisma.brandName.delete({
      where: {
        id,
      },
    })

    return 'Delete success'
  }
}

export default BrandService
