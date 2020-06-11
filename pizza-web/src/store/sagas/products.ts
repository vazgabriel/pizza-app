import { call, put } from 'redux-saga/effects'

import { api } from '../../api'
import { setDrinks, setPizzas } from '../ducks/products'
import { errorMessage } from '../../utils/error'
import { Product } from '../ducks/products'
import { ProductType } from '../../enum/ProductType'

export function* getProducts(type?: string, cb?: (error?: string) => void) {
  if (type) {
    type = `?type=${type}`
  }

  try {
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
  } catch (error) {
    cb?.(errorMessage(error))
  }
}
