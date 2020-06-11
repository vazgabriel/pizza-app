import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import { Provider } from 'react-redux'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { PersistGate } from 'redux-persist/integration/react'

import styles from './global/styles'
import AppRouter from './AppRouter'
import { store, persistor, sagaMiddleware } from './store'

import { renewToken } from './store/sagas/user'
import { getUSDConfig } from './store/sagas/config'
import { getProducts } from './store/sagas/products'

function App() {
  useEffect(() => {
    sagaMiddleware.run(getUSDConfig)
    sagaMiddleware.run(getProducts)
    sagaMiddleware.run(renewToken)
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <CSSReset />
          <Global styles={styles} />
          <AppRouter />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
