/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Image, Text, StyleSheet, StatusBar } from 'react-native'

import Button from '../components/button'
import Box from '../components/box'

function HomeScreen({ navigation }) {
  return (
    <Box style={styles.homePage}>
      <StatusBar barStyle="light-content" />
      <Box>
        <Image style={styles.welcome} source={require('../assets/logo.png')} />
        <Box style={{ marginTop: 400 }}>
          <Button
            alignSelf="flex-start"
            ml={265}
            onPress={() => {
              navigation.navigate('Challenges')
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: '#ED36BA', fontWeight: 'bold' }
              ]}
            >
              Play
            </Text>
          </Button>
          <Button alignSelf="flex-start" ml={265} mt={26}>
            <Text
              style={[
                styles.buttonText,
                { color: '#3B4AE6', fontWeight: 'bold' }
              ]}
            >
              Menu
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  welcome: {
    alignSelf: 'center',
    marginTop: 150
  },
  homePage: {
    flex: 1,
    backgroundColor: '#1F252D'
  },
  buttonText: {
    fontSize: 28,
    color: 'white'
  }
})

export default HomeScreen
