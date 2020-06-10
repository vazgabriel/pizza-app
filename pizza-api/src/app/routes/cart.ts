import { Router } from 'express'

import { AuthService } from '../services/AuthService'
import { CartController } from '../controllers/CartController'

const router = Router()

// Get any active cart
router.get('/', AuthService.authMiddleware, CartController.get)

// Adding an item (it creates a cart if it don't exists)
router.post('/', AuthService.authMiddleware, CartController.addItem)

// Update cart item
router.patch(
  '/:cartId/:cartItemId',
  AuthService.authMiddleware,
  CartController.updateItem
)

// Remove cart item
router.delete(
  '/:cartId/:cartItemId',
  AuthService.authMiddleware,
  CartController.removeItem
)

export default router
