import { combineReducers } from 'redux'

import cart, { CartState } from './cart'
import config, { ConfigState } from './config'
import products, { ProductState } from './products'
import user, { UserState } from './user'
import purchaseHistory, { PurchaseHistory } from './purchaseHistory'

const rootReducer = combineReducers({
  cart,
  config,
  products,
  purchaseHistory,
  user,
})

export interface AppState {
  cart: CartState
  config: ConfigState
  products: ProductState
  purchaseHistory: PurchaseHistory[]
  user: UserState
}

export default rootReducer
