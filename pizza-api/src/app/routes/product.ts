import { Router } from 'express'

import { ProductController } from '../controllers/ProductController'

const router = Router()

// List all products with filters for type (PIZZA, DRINK)
router.get('/', ProductController.get)

export default router
