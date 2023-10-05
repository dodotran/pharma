import { prisma } from '@/server/db'
import { TRPCError } from '@trpc/server'
import { UtilsService } from './utils.service'

class CartService extends UtilsService {
  async getAllCarts(userId: string) {
    const carts = await prisma.cart.findMany({
      where: {
        user_id: userId,
      },
      include: {
        Product: {
          include: {
            category: true,
            image: true,
          },
        },
      },
    })

    return carts
  }

  async addToCart(userId: string, productId: string) {
    await this.CheckAuth(userId)

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.notFound',
      })
    }

    if (product.quantity <= 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.out-of-product',
      })
    }

    if (product.status === 'DEN_HIEU_THUOC') {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.go-to-pharmacy',
      })
    }

    const cart = await prisma.cart.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    })

    if (cart) {
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          quantity: cart.quantity + 1,
        },
      })

      return 'Update cart successfully'
    } else {
      const createCart = await prisma.cart.create({
        data: {
          user_id: userId,
          product_id: productId,
          quantity: 1,
        },
      })

      return createCart
    }
  }

  async incrementCart(userId: string, productId: string) {
    await this.CheckAuth(userId)

    const cart = await prisma.cart.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    })

    if (cart) {
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          quantity: cart.quantity + 1,
        },
      })

      return 'Update cart successfully'
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.notFound',
      })
    }
  }

  async decrementCart(userId: string, productId: string) {
    await this.CheckAuth(userId)

    const cart = await prisma.cart.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    })

    if (cart) {
      if (cart.quantity > 1) {
        await prisma.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            quantity: cart.quantity - 1,
          },
        })

        return 'Update cart successfully'
      } else {
        await prisma.cart.delete({
          where: {
            id: cart.id,
          },
        })

        return 'Delete cart successfully'
      }
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.notFound',
      })
    }
  }

  async deleteCart(userId: string, productId: string) {
    await this.CheckAuth(userId)

    const cart = await prisma.cart.findFirst({
      where: {
        user_id: userId,
        product_id: productId,
      },
    })

    if (cart) {
      await prisma.cart.delete({
        where: {
          id: cart.id,
        },
      })

      return 'Delete cart successfully'
    } else {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'error.notFound',
      })
    }
  }
}

export default CartService
