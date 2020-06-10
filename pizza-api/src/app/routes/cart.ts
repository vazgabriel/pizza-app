import { Router } from 'express'

import { AuthService } from '../services/AuthService'

const router = Router()

// Get any active cart
router.get('/', AuthService.authMiddleware, (_, res) => res.json({ notImplemented: true }))

// Creating a new cart (adding first item)
router.post('/', AuthService.authMiddleware, (_, res) => res.json({ notImplemented: true }))

// Updating the cart (adding or removing items)
router.patch('/:cartId', AuthService.authMiddleware, (_, res) => res.json({ notImplemented: true }))

// Remove cart (once remove all items inside the cart)
router.delete('/:cartId', AuthService.authMiddleware, (_, res) => res.json({ notImplemented: true }))

export default router
