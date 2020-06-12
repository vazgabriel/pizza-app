import { call, put, delay } from 'redux-saga/effects'

import { api } from '../../api'
import { setUSD } from '../ducks/config'

export function* getUSDConfig() {
  let retries = 0

  while (retries < 100) {
    try {
      if (retries > 0) {
        yield delay(1000)
      }

      const response = yield call(api.get, `/checkout/currency/USD`)
      yield put(setUSD(response.data.value))
      retries = 100
    } catch (error) {
      retries++
    }
  }
}
