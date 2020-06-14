import { getRepository, getManager } from 'typeorm'
import { Request, Response } from 'express'

import { MONTHLY } from '../constants'
import { Cart } from '../../entity/Cart'
import { Checkout, Currency, CURRENCIES } from '../../entity/Checkout'

export class CheckoutController {
  static async getPurchaseHistory(req: Request, res: Response) {
    const purchaseHistory = await getRepository(Checkout).find({
      where: { userId: req.user!.id },
      order: { createdAt: 'DESC' },
      relations: ['cart'],
    })

    return res.json(purchaseHistory)
  }

  static async getPurchaseHistoryDetail(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(404).send()
    }

    const purchase = await getRepository(Checkout).findOne({
      where: {
        id,
        userId: req.user!.id,
      },
      cache: MONTHLY,
      relations: ['cart'],
    })

    if (!purchase) {
      return res.status(404).send()
    }

    return res.json(purchase)
  }

  static async purchase(req: Request, res: Response) {
    const { address, address_2, foodPrice, deliveryPrice, currency } = req.body

    if (
      !address ||
      !foodPrice ||
      !deliveryPrice ||
      !currency ||
      !CURRENCIES.includes(currency)
    ) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    const user = req.user!

    const cart = await getRepository(Cart).findOne({
      where: {
        userId: user.id,
        isActive: true,
      },
    })

    if (!cart || cart.id !== parseInt(req.params.cartId, 10)) {
      return res.status(404).send()
    }

    let checkout = new Checkout()

    let actualDelivery = await CheckoutController.getPrice(address)
    let actualFoodPrice = cart.items.reduce(
      (a, c) => a + c.product.price * c.quantity,
      0
    )

    if (currency !== Currency.EURO) {
      actualDelivery *= await CheckoutController.getCurrencyValue(currency)
      actualFoodPrice *= await CheckoutController.getCurrencyValue(currency)
    }

    if (actualFoodPrice !== foodPrice || actualDelivery !== deliveryPrice) {
      return res.status(400).json({ message: 'Invalid prices' })
    }

    checkout.address = address
    checkout.address_2 = !!address_2 ? address_2 : null
    checkout.foodPrice = parseInt(foodPrice, 10)
    checkout.deliveryPrice = parseInt(deliveryPrice, 10)
    checkout.currency = currency
    checkout.totalPrice = checkout.foodPrice + checkout.deliveryPrice
    checkout.cart = cart
    checkout.user = user

    try {
      await getManager().transaction(async (trx) => {
        checkout = await trx.save(checkout)
        cart.isActive = false // The cart is not active anymore
        await trx.save(cart)
      })

      return res.status(201).json(checkout)
    } catch (error) {
      return res
        .status(422)
        .json({ message: 'Error during the checkout, try again later' })
    }
  }

  static async getDeliveryPrice(req: Request, res: Response) {
    const { address } = req.body

    if (!address) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    return res.json({ price: await CheckoutController.getPrice(address) })
  }

  static async getPrice(_address: string) {
    // not using address yet
    // It could be nice to have a dynamic price in the future, and it's easy to implement here
    return 300
  }

  static async getCurrencyValue(currency: Currency) {
    switch (currency) {
      case Currency.DOLAR:
        return 1.14
      case Currency.EURO:
      default:
        return 1
    }
  }
}
