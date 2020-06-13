import { call, put, select, delay } from 'redux-saga/effects'

import { api } from '../../api'
import { AppState } from '../ducks'
import { login } from '../ducks/user'
import { errorMessage } from '../../utils/error'

import { loadCart } from './cart'
import { sagaMiddleware } from '..'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload extends LoginPayload {
  firstName: string
  lastName: string
}

export function* loginUser(
  payload: LoginPayload,
  cb: (error?: string) => void
) {
  try {
    const response = yield call(api.post, '/auth/login', payload)
    yield put(login(response.data))
    sagaMiddleware.run<any>(loadCart)
    cb()
  } catch (error) {
    cb(errorMessage(error))
  }
}

export function* registerUser(
  payload: RegisterPayload,
  cb: (error?: string) => void
) {
  try {
    const response = yield call(api.post, '/auth/register', payload)
    yield put(login(response.data))
    sagaMiddleware.run<any>(loadCart)
    cb()
  } catch (error) {
    cb(errorMessage(error))
  }
}

export function* renewToken() {
  const token = yield select((state: AppState) => state.user.token)
  if (!token) {
    return
  }
  let retries = 0

  while (retries < 10) {
    try {
      if (retries > 0) {
        yield delay(1000)
      }
      const response = yield call(api.get, '/auth/renew-token', {
        headers: {
          Authorization: token,
        },
      })
      yield put(login(response.data))
      sagaMiddleware.run<any>(loadCart)

      retries = 10
    } catch (error) {
      retries++
    }
  }
}
