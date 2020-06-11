import { call, put } from 'redux-saga/effects'

import { api } from '../../api'
import { setUSD } from '../ducks/config'

export function* getUSDConfig() {
  try {
    const response = yield call(api.get, `/checkout/currency/USD`)
    yield put(setUSD(response.data.value))
  } catch (error) {}
}
