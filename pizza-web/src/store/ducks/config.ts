import { BaseAction } from '../action'

export const SET_USD = 'config/SET_USD'

export interface ConfigState {
  USD: number
}

const INITIAL_STATE: ConfigState = {
  USD: 1.14,
}

export default function reducer(state = INITIAL_STATE, action: BaseAction) {
  switch (action.type) {
    case SET_USD:
      return { ...state, USD: action.payload }
    default:
      return state
  }
}

export function setUSD(payload: number) {
  return { type: SET_USD, payload }
}
