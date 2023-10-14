import { CreateProduct, UpdateProduct, UploadImageSchemaType } from '@/libs/schema/product.schema'
import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
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
        product_detail: true,
        trademark: true,
      },
    })

    return product
  }

  async create(data: CreateProduct, userId: string) {
    this.CheckAdmin(userId)

    const {
      name,
      price,
      quantity,
      unit_id,
      expired_date,
      status,
      category_id,
      trademark_id,
      ...res
    } = data

    const product = await prisma.product.create({
      data: {
        name,
        unit_id,
        expired_date,
        status,
        category_id,
        price: Number(price),
        quantity: Number(quantity),
        trademark_id,
      },
    })

    if (!product)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Create product failed',
      })

    const productDetail = await prisma.productDetail.create({
      data: {
        product_id: product.id,
        ...res,
      },
    })

    if (!productDetail) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Create product detail failed',
      })
    }

    return { ...product, productDetail }
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

  async uploadImage(data: UploadImageSchemaType, userId: string) {
    this.CheckAdmin(userId)

    const product = await prisma.product.findUnique({
      where: {
        id: data.product_id,
      },
    })

    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      })
    }

    const image = await prisma.imageProduct.create({
      data,
    })

    return image
  }

  async getRandomProduct() {
    const product = await prisma.product.findMany({
      include: {
        unit: true,
        category: true,
        image: true,
      },
      take: 4,
    })

    return product
  }

  async getTrademarkProduct(id: string) {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        unit: true,
        category: true,
        image: true,
      },
    })

    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      })
    }

    const trademarkProduct = await prisma.product.findMany({
      where: {
        trademark_id: product.trademark_id,
      },
      include: {
        unit: true,
        category: true,
        image: true,
      },
    })

    if (!trademarkProduct) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Trademark product not found',
      })
    }

    return trademarkProduct
  }

  async updateProduct(data: UpdateProduct, userId: string) {
    this.CheckAdmin(userId)
    const {
      name,
      price,
      quantity,
      unit_id,
      expired_date,
      status,
      category_id,
      trademark_id,
      ...res
    } = data

    const product = await prisma.product.findUnique({
      where: {
        id: data.id,
      },
      include: {
        product_detail: true,
      },
    })

    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product not found',
      })
    }

    const productDetail = await prisma.productDetail.findUnique({
      where: {
        id: product.product_detail?.id,
      },
    })

    if (!productDetail) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Product detail not found',
      })
    }

    const updateProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        price: Number(price),
        quantity: Number(quantity),
        name,
        unit_id,
        expired_date,
        status,
        category_id,
        trademark_id,
      },
    })

    const updateProductDetail = await prisma.productDetail.update({
      where: {
        id: product.product_detail?.id,
      },
      data: {
        ...res,
      },
    })

    return { ...updateProduct, updateProductDetail }
  }
}

export default ProductService
