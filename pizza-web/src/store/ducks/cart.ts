import { BaseAction } from '../action'
import { Product } from './products'

export const SET_CART = 'cart/SET_CART'
export const ADD_ITEM = 'cart/ADD_ITEM'
export const UPDATE_ITEM = 'cart/UPDATE_ITEM'
export const REMOVE_ITEM = 'cart/REMOVE_ITEM'

export interface Item {
  id?: number
  productId: number
  quantity: number
  comments?: string
  createdAt?: string
  product: Product
}

export interface CartState {
  id?: number
  items: Item[]
  createdAt?: string
}

const INITIAL_STATE: CartState = {
  items: [],
}

export default function reducer(state = INITIAL_STATE, action: BaseAction) {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload }
    case ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] }
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((e) =>
          e.productId === action.payload.productId ? action.payload : e
        ),
      }
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((e) => e.productId !== action.payload),
      }
    default:
      return state
  }
}

export function setCart(payload: CartState) {
  return { type: SET_CART, payload }
}

export function addItem(product: Product) {
  const payload: Item = {
    product: { ...product },
    productId: product.id,
    quantity: 1,
  }

  return { type: ADD_ITEM, payload }
}

export function updateItem(payload: Item) {
  return { type: UPDATE_ITEM, payload }
}

export function removeItem(payload: number) {
  // productId
  return { type: REMOVE_ITEM, payload }
}
