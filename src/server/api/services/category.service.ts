import { CategorySchemaType, CategorySchemaUpdateType } from '@/libs/schema/category.schema'
import { prisma } from '@/server/db'
import { User } from 'next-auth'
import { UtilsService } from './utils.service'

class CategoryService extends UtilsService {
  async getAll() {
    const category = await prisma.category.findMany()

    return category
  }

  async get(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    return category
  }

  async create(data: CategorySchemaType, user: User) {
    await this.CheckAdmin(user.id)

    const category = await prisma.category.create({
      data,
    })

    return category
  }

  async update(data: CategorySchemaUpdateType, user: User) {
    await this.CheckAdmin(user.id)

    const { id, name } = data

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
    console.log(category)

    return category
  }

  async delete(id: string, user: User) {
    await this.CheckAdmin(user.id)

    await prisma.category.delete({
      where: {
        id,
      },
    })

    return 'Delete success!'
  }

  async getProductByCategory(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        Product: true,
      },
    })

    return category
  }

  async getById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    return category
  }
}

export default CategoryService
