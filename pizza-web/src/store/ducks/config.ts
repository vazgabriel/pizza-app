import { BaseAction } from '../action'

export const SET_USD = 'config/SET_USD'
export const SET_LOADING = 'config/SET_LOADING'
export const SET_LOADING_END = 'config/SET_LOADING_END'

export interface ConfigState {
  USD: number
  loading: boolean
}

const INITIAL_STATE: ConfigState = {
  USD: 1.14,
  loading: true,
}

export default function reducer(state = INITIAL_STATE, action: BaseAction) {
  switch (action.type) {
    case SET_USD:
      return { ...state, USD: action.payload }
    case SET_LOADING:
      return { ...state, loading: true }
    case SET_LOADING_END:
      return { ...state, loading: false }
    default:
      return state
  }
}

export function setUSD(payload: number) {
  return { type: SET_USD, payload }
}

export function setLoading() {
  return { type: SET_LOADING }
}

export function setLoadingEnd() {
  return { type: SET_LOADING_END }
}
