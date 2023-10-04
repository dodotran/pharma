import { CreateProduct } from '@/libs/schema/product.schema'
import { prisma } from '@/server/db'
import { UtilsService } from './utils.service'

class ProductService extends UtilsService {
  async getAll() {
    const product = await prisma.product.findMany({
      include: {
        unit: true,
        category: true,
        image: true,
      },
    })

    return product
  }

  async byId(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        unit: true,
        category: true,
        image: true,
      },
    })

    return product
  }

  async create(data: CreateProduct) {
    const product = await prisma.product.create({
      data: {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      },
    })

    return product
  }
}

export default ProductService
