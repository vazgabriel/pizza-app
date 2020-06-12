import React from 'react'
import { Global } from '@emotion/core'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import styles from './global/styles'
import AppRouter from './AppRouter'
import { store, persistor } from './store'

function App() {
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
