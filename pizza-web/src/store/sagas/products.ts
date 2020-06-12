import { call, put, delay } from 'redux-saga/effects'

import { api } from '../../api'
import { errorMessage } from '../../utils/error'
import { ProductType } from '../../enum/ProductType'
import { setLoading, setLoadingEnd } from '../ducks/config'
import { Product, setDrinks, setPizzas } from '../ducks/products'

export function* getProducts(type?: string, cb?: (error?: string) => void) {
  yield put(setLoading())

  if (type) {
    type = `?type=${type}`
  }

  let retries = 0
  let error = ''

  while (retries < 10) {
    try {
      if (retries > 0) {
        yield delay(1000)
      }

      const response = yield call(api.get, `/product${type || ''}`)
      const products = response.data as Product[]

      const drinks = products.filter((e) => e.type === ProductType.DRINK)
      const pizzas = products.filter((e) => e.type === ProductType.PIZZA)

      if (type === ProductType.DRINK) {
        yield put(setDrinks(drinks))
      } else if (type === ProductType.PIZZA) {
        yield put(setPizzas(pizzas))
      } else {
        yield put(setDrinks(drinks))
        yield put(setPizzas(pizzas))
      }

      cb?.()
      retries = 10 // Stop retrying
    } catch (err) {
      retries++

      if (retries === 10) {
        error = errorMessage(err)
      }
    }
  }

  if (error !== '') {
    cb?.(error)
  }

  yield put(setLoadingEnd())
}
