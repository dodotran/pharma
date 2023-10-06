import { CreateProduct, UpdateProduct } from '@/libs/schema/product.schema'
import { prisma } from '@/server/db'
import { UtilsService } from './utils.service'

class ProductService extends UtilsService {
  async getAll() {
    const product = await prisma.product.findMany({
      include: {
        unit: true,
        category: true,
        image: true,
        product_detail: true,
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

  async create(data: CreateProduct, userId: string) {
    this.CheckAdmin(userId)

    const { name, price, quantity, unit_id, expired_date, status, category_id, ...res } = data

    const product = await prisma.product.create({
      data: {
        name,
        unit_id,
        expired_date,
        status,
        category_id,
        price: Number(price),
        quantity: Number(quantity),
      },
    })

    let detail

    if (product) {
      const productDetail = await prisma.productDetail.create({
        data: {
          product_id: product.id,
          ...res,
        },
      })

      detail = productDetail
    }

    return { ...product, detail }
  }

  async delete(id: string, userId: string) {
    this.CheckAdmin(userId)

    const product = await prisma.product.delete({
      where: {
        id,
      },
    })

    return product
  }

  async update(data: UpdateProduct, userId: string) {
    this.CheckAdmin(userId)
    const { id } = data

    const product = await prisma.product.update({
      where: {
        id,
      },
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
