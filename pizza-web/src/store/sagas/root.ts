import { take, call, cancel, fork, delay } from 'redux-saga/effects'

import { _syncCart } from './cart'
import { ADD_ITEM, UPDATE_ITEM } from '../ducks/cart'
export function* rootSaga() {
  function* delayedSyncCart() {
    try {
      yield delay(3000)
      yield call(_syncCart)
    } catch (error) {} // Generate error on cancel
  }

  let task
  while (true) {
    const action = yield take([ADD_ITEM, UPDATE_ITEM])

    if (task) yield cancel(task)

    // @ts-ignore
    task = yield fork(delayedSyncCart, action)
  }
}
