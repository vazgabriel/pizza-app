import { Router } from 'express'

import { AuthService } from '../services/AuthService'
import { AuthController } from '../controllers/AuthController'

const router = Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get(
  '/renew-token',
  AuthService.authMiddleware,
  AuthController.renewToken
)

export default router
