import { BaseAction } from '../action'

export const LOGIN = 'user/LOGIN'
export const LOGOUT = 'user/LOGOUT'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

export interface UserState {
  user?: User
  token?: string
}

const INITIAL_STATE: UserState = {}

export default function reducer(state = INITIAL_STATE, action: BaseAction) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload }
    case LOGOUT:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}

export function login(payload: UserState) {
  return { type: LOGIN, payload }
}

export function logout() {
  return { type: LOGOUT }
}
