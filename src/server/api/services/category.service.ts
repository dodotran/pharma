import { CategorySchemaUpdateType, CreateCategorySchemaType } from '@/libs/schema/category.schema'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { User } from 'next-auth'
import { UtilsService } from './utils.service'

class CategoryService extends UtilsService {
  async getAll() {
    const category = await prisma.category.findMany({
      include: {
        product: true,
      },
    })

    return category
  }

  async create(data: CreateCategorySchemaType, user: User) {
    await this.CheckAdmin(user.id)

    const category = await prisma.category.create({
      data,
    })

    return category
  }

  async update(data: CategorySchemaUpdateType, user: User) {
    await this.CheckAdmin(user.id)
    const { id, name } = data

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.category-not-found' })
    }

    const categoryUpdate = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })

    return categoryUpdate
  }

  async delete(id: string, user: User) {
    await this.CheckAdmin(user.id)

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.category-not-found' })
    }

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
        product: true,
      },
    })

    if (!category) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.category-not-found' })
    }

    return category
  }

  async getById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    })

    if (!category) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'error.category-not-found' })
    }

    return category
  }
}

export default CategoryService
