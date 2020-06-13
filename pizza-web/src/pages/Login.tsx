import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Auth from '../components/Auth'
import { AppState } from '../store/ducks'

export default function Checkout() {
  const token = useSelector((state: AppState) => state.user.token)

  return !!token ? <Redirect to='/' /> : <Auth />
}
