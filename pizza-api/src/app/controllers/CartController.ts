import { getRepository } from 'typeorm'
import { Request, Response } from 'express'

import { Cart } from '../../entity/Cart'
import { CartItem } from '../../entity/CartItem'

export class CartController {
  static async get(req: Request, res: Response) {
    try {
      const cart = await getRepository(Cart).findOneOrFail({
        where: {
          userId: req.user!.id,
          isActive: true,
        },
      })

      return res.json(cart)
    } catch (error) {
      return res.json({})
    }
  }

  static async addItem(req: Request, res: Response) {
    let { productId, quantity, comments } = req.body
    quantity = parseInt(quantity)

    if (!productId || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    const user = req.user!
    const cartRepo = getRepository(Cart)

    try {
      let cart = await cartRepo.findOne({
        where: {
          userId: user.id,
          isActive: true,
        },
        loadEagerRelations: false,
      })

      if (!cart) {
        cart = new Cart()
        cart.user = user
        await cartRepo.save(cart)
      }

      const cartItem = new CartItem()
      cartItem.productId = productId
      cartItem.quantity = quantity
      cartItem.comments = !!comments ? comments : null
      cartItem.cart = cart
      await getRepository(CartItem).save(cartItem)

      return res.json(
        await cartRepo.findOne({
          where: {
            userId: user.id,
            isActive: true,
          },
        })
      )
    } catch (error) {
      return res
        .status(422)
        .json({ message: 'Error adding Item, please try again later' })
    }
  }

  static async updateItem(req: Request, res: Response) {
    let { quantity, comments } = req.body
    const { cartId, cartItemId } = req.params
    quantity = parseInt(quantity)

    if (isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    const cartItemRepo = getRepository(CartItem)

    try {
      const item = await cartItemRepo
        .createQueryBuilder('cartitem')
        .innerJoin('cartitem.cart', 'cart')
        .innerJoinAndSelect('cartitem.product', 'product')
        .where('cartitem.id = :cartItemId', { cartItemId })
        .andWhere('cart.id = :cartId', { cartId })
        .andWhere('cart.userId = :userId', { userId: req.user!.id })
        .getOne()

      if (!item) {
        return res.status(404).send()
      }

      item.quantity = quantity
      item.comments = !!comments ? comments : null
      await cartItemRepo.save(item)

      return res.json(item)
    } catch (error) {
      return res
        .status(422)
        .json({ message: 'Error updating Item, please try again later' })
    }
  }

  static async removeItem(req: Request, res: Response) {
    const { cartId, cartItemId } = req.params
    const cartItemRepo = getRepository(CartItem)

    try {
      const item = await cartItemRepo
        .createQueryBuilder('cartitem')
        .innerJoin('cartitem.cart', 'cart')
        .innerJoinAndSelect('cartitem.product', 'product')
        .where('cartitem.id = :cartItemId', { cartItemId })
        .andWhere('cart.id = :cartId', { cartId })
        .andWhere('cart.userId = :userId', { userId: req.user!.id })
        .getOne()

      if (!item) {
        return res.status(404).send()
      }

      await cartItemRepo.delete(item.id)
      return res.status(204).send()
    } catch (error) {
      return res
        .status(422)
        .json({ message: 'Error deleting Item, please try again later' })
    }
  }
}
