import { Router } from 'express'

import { Currency } from '../../entity/Checkout'
import { AuthService } from '../services/AuthService'
import { CheckoutController } from '../controllers/CheckoutController'

const router = Router()

// Get currency value (compared to EUR)
router.get('/currency/:currency', async (req, res) =>
  res.json({
    value: await CheckoutController.getCurrencyValue(
      req.params.currency as Currency
    ),
  })
)

// Get purchase history
router.get(
  '/purchase-history',
  AuthService.authMiddleware,
  CheckoutController.getPurchaseHistory
)

// Get purchase history Detail
router.get(
  '/purchase-history/:id',
  AuthService.authMiddleware,
  CheckoutController.getPurchaseHistoryDetail
)

// Get delivery price
router.post(
  '/delivery-price',
  AuthService.authMiddleware,
  CheckoutController.getDeliveryPrice
)

// Finish checkout
router.post('/:cartId', AuthService.authMiddleware, CheckoutController.purchase)

export default router
