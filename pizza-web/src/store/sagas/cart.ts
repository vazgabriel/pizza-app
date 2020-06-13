import { put, all, call, select } from 'redux-saga/effects'

import {
  removeItem as _removeItem,
  setCart,
  Item,
  CartState,
} from '../ducks/cart'
import { api } from '../../api'
import { AppState } from '../ducks'
import { errorMessage } from '../../utils/error'

export function* _syncCart() {
  console.log('executed')
  const { token, cart } = yield select((state: AppState) => ({
    token: state.user.token,
    cart: state.cart,
  }))

  if (!token) return

  try {
    const nonSyncItems = cart.items.filter(
      (e: Item) => !e.id || e.dirty
    ) as Item[]

    if (!nonSyncItems.length) {
      return
    }

    // Run creates/updates in parallel
    yield all(
      nonSyncItems.map((i) =>
        call(
          i.id ? api.patch : api.post,
          `/cart${i.id ? `/${cart.id}/${i.id}` : ''}`,
          {
            quantity: i.quantity,
            comments: !!i.comments ? i.comments : undefined,
            productId: i.id ? undefined : i.productId,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
      )
    )

    const response = yield call(api.get, '/cart', {
      headers: {
        Authorization: token,
      },
    })

    yield put(setCart(response.data))
  } catch (error) {}
}

export function* loadCart() {
  const { token, cart } = yield select((state: AppState) => ({
    token: state.user.token,
    cart: state.cart,
  }))

  if (!token) return

  try {
    const nonSyncItems = cart.items.filter(
      (e: Item) => !e.id || e.dirty
    ) as Item[]

    const response = yield call(api.get, '/cart', {
      headers: {
        Authorization: token,
      },
    })
    const dbCart = response.data as CartState

    const newCart: CartState = {
      items: nonSyncItems,
    }

    if (!!dbCart.id) {
      newCart.id = dbCart.id
      newCart.createdAt = dbCart.createdAt

      if (!!dbCart.items.length) {
        dbCart.items.forEach((e) => {
          const index = newCart.items.findIndex(
            (i) => i.productId === e.productId
          )
          if (index !== -1) {
            if (!newCart.items[index].dirty) {
              newCart.items[index] = e
            }
          } else {
            newCart.items.push(e)
          }
        })
      }
    }

    yield put(setCart(newCart))
    yield call(_syncCart)
  } catch (error) {}
}

export function* removeItem(productId: number, cb: (error?: string) => void) {
  const { token, cart } = yield select((state: AppState) => ({
    token: state.user.token,
    cart: state.cart,
  }))

  try {
    const item = cart.items.find((e: Item) => e.productId === productId)
    if (!!token && !!cart.id && !!item.id) {
      yield call(api.delete, `/cart/${cart.id}/${item.id}`, {
        headers: {
          Authorization: token,
        },
      })
    }

    yield put(_removeItem(productId))
    cb()
  } catch (error) {
    cb(errorMessage(error))
  }
}
