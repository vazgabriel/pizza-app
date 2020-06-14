import { call, select, put } from 'redux-saga/effects'

import { api } from '../../api'
import { AppState } from '../ducks'
import { _syncCart, loadCart } from './cart'
import { errorMessage } from '../../utils/error'
import { setPurchaseHistory } from '../ducks/purchaseHistory'

export function* getPurchaseHistory() {
  const token = yield select((state: AppState) => state.user.token)

  if (!token) {
    return
  }

  try {
    const response = yield call(api.get, '/checkout/purchase-history', {
      headers: {
        Authorization: token,
      },
    })

    yield put(setPurchaseHistory(response.data))
  } catch (error) {}
}

export function* deliveryPrice(
  address: string,
  cb: (error?: string, price?: number) => void
) {
  const token = yield select((state: AppState) => state.user.token)

  if (!token) {
    return cb('User not logged')
  }

  try {
    const response = yield call(
      api.post,
      '/checkout/delivery-price',
      { address },
      {
        headers: {
          Authorization: token,
        },
      }
    )

    cb(undefined, response.data.price)
  } catch (error) {
    cb(errorMessage(error))
  }
}

export function* completePurchase(
  body: {
    address: string
    address_2: string
    foodPrice: number
    deliveryPrice: number
    currency: string
  },
  cb: (error?: string) => void
) {
  // Sync Cart
  yield call(_syncCart)

  const { cart, token } = yield select((state: AppState) => ({
    token: state.user.token,
    cart: state.cart,
  }))

  try {
    yield call(
      api.post,
      `/checkout/${cart.id}`,
      { ...body, address_2: !!body.address_2 ? body.address_2 : undefined },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    yield call(getPurchaseHistory)
    yield call(loadCart)

    cb(undefined)
  } catch (error) {
    cb(errorMessage(error))
  }
}
