import { BaseAction } from '../action'
import { ProductType } from '../../enum/ProductType'

export const SET_PIZZAS = 'products/SET_PIZZAS'
export const SET_DRINKS = 'products/SET_DRINKS'

export interface Product {
  id: number
  name: string
  description: string
  pictureUrl: string
  type: ProductType
  price: number
  createdAt: string
}

export interface ProductState {
  pizzas: Product[]
  drinks: Product[]
}

const INITIAL_STATE: ProductState = {
  pizzas: [],
  drinks: [],
}

export default function reducer(state = INITIAL_STATE, action: BaseAction) {
  switch (action.type) {
    case SET_PIZZAS:
      return { ...state, pizzas: action.payload }
    case SET_DRINKS:
      return { ...state, drinks: action.payload }
    default:
      return state
  }
}

export function setPizzas(payload: Product[]) {
  return { type: SET_PIZZAS, payload }
}

export function setDrinks(payload: Product[]) {
  return { type: SET_DRINKS, payload }
}
