import { LOGOUT } from './user'
import { BaseAction } from '../action'
import { CartState } from './cart'

export const SET_PURCHASE_HISTORY = 'purchaseHistory/SET_PURCHASE_HISTORY'

export interface PurchaseHistory {
  id: number
  address: string
  address_2?: string
  foodPrice: number
  deliveryPrice: number
  totalPrice: number
  currency: string
  cart: CartState
  createdAt: string
}

const INITIAL_STATE: PurchaseHistory[] = []

export default function reducer(state = INITIAL_STATE, action: BaseAction) {
  switch (action.type) {
    case SET_PURCHASE_HISTORY:
      return action.payload
    case LOGOUT:
      return []
    default:
      return state
  }
}

export function setPurchaseHistory(payload: PurchaseHistory[]) {
  return { type: SET_PURCHASE_HISTORY, payload }
}
