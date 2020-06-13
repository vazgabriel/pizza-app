import React from 'react'
import { useSelector } from 'react-redux'

import Auth from '../components/Auth'
import { AppState } from '../store/ducks'
import CheckoutSteps from '../components/CheckoutSteps'

export default function Checkout() {
  const token = useSelector((state: AppState) => state.user.token)

  return !!token ? <CheckoutSteps /> : <Auth />
}
