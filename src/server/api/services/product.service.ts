import { CreateProductSchemaType } from '@/libs/schema/product.schema'
import { prisma } from '@/server/db'
import { UtilsService } from './utils.service'

class ProductService extends UtilsService {
  async getAll() {
    const product = await prisma.product.findMany()

    return product
  }

  async byId(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        unit: true,
        BrandName: true,
        Category: true,
        BrandOrigin: true,
        image: true,
      },
    })

    return product
  }

  async create(data: CreateProductSchemaType) {
    const date = new Date()

    const product = await prisma.product.create({
      data: {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
        expiryProduct: date,
      },
    })

    return product
  }
}

export default ProductService
