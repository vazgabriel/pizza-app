import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Header from './components/Header'

import Home from './pages/Home'
import Checkout from './pages/Checkout'

export default function AppRouter() {
  return (
    <Router>
      <Header />
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
    </Router>
  )
}
