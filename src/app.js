import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-view'
import { ThemeProvider } from 'styled-components'
import AsyncStorage from '@react-native-community/async-storage'

import theme from './utils/theme'
import Navigation from './navigation'

function App() {
  React.useEffect(() => {
    const getUserPreferences = async () => {
      try {
        global.userPreferences = await AsyncStorage.getItem('USER_PREFERENCES')
        global.userPreferences = JSON.parse(global.userPreferences)
      } catch (e) {
        // saving error
        console.log('there is an error on getting user preferences.')
        console.log(e)
      }
    }
    getUserPreferences()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
