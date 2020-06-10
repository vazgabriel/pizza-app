import { Router } from 'express'

import { AuthService } from '../services/AuthService'

const router = Router()

// Get purchase history
router.get('/purchase-history', AuthService.authMiddleware, (_, res) => res.json({ notImplemented: true }))

// Finish checkout
router.post('/:cartId', AuthService.authMiddleware, (_, res) => res.json({ notImplemented: true }))

export default router
