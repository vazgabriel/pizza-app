import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Box, useToast } from '@chakra-ui/core'

import Header from './components/Header'

import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { sagaMiddleware } from './store'
import { renewToken } from './store/sagas/user'
import { getUSDConfig } from './store/sagas/config'
import { getProducts } from './store/sagas/products'

export default function AppRouter() {
  const toast = useToast()

  useEffect(() => {
    sagaMiddleware.run(renewToken)
    sagaMiddleware.run(getUSDConfig)

    sagaMiddleware.run(getProducts, undefined, (error) => {
      if (error) {
        toast({
          title: 'Error',
          description: error,
          status: 'error',
          duration: 8000,
        })
      }
    })
  }, [toast])

  return (
    <Router>
      <Header />
      <Box p='80px 0px 1rem 0px'>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/checkout' exact>
            <Checkout />
          </Route>
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Box>
    </Router>
  )
}
