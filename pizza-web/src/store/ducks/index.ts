import { combineReducers } from 'redux'

import cart, { CartState } from './cart'
import config, { ConfigState } from './config'
import products, { ProductState } from './products'
import user, { UserState } from './user'

const rootReducer = combineReducers({
  cart,
  config,
  products,
  user,
})

export interface AppState {
  cart: CartState
  config: ConfigState
  products: ProductState
  user: UserState
}

export default rootReducer
