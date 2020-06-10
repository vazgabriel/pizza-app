import { Router } from 'express'

import auth from './auth'
import cart from './cart'
import checkout from './checkout'
import product from './product'

const routes = Router()

routes.use('/auth', auth)
routes.use('/cart', cart)
routes.use('/checkout', checkout)
routes.use('/product', product)

export { routes }
