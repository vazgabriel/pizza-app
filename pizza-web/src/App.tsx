import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'

import styles from './global/styles'
import AppRouter from './AppRouter'

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Global styles={styles} />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
