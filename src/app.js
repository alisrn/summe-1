import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-view'
import { ThemeProvider } from 'styled-components'
import AsyncStorage from '@react-native-community/async-storage'

import theme from './utils/theme'
import Navigation from './navigation'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
