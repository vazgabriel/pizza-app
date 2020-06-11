import { call, put, select } from 'redux-saga/effects'

import { api } from '../../api'
import { login } from '../ducks/user'
import { AppState } from '../ducks'
import { errorMessage } from '../../utils/error'

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

  try {
    const response = yield call(api.get, '/auth/renew-token', {
      headers: {
        Authorization: token,
      },
    })
    yield put(login(response.data))
  } catch (error) {}
}
