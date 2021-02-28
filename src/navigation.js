/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, Text } from 'react-native'

import theme from './utils/theme'

import { Left } from './components/icons'
import Button from './components/button'

import HomeScreen from './views/HomeScreen'
import ChallengeScreen from './views/ChallengeScreen'
import GameScreen from './views/GameScreen'
import MenuBar from './views/MenuBar'
import RateUs from './views/RateUs'

const Stack = createStackNavigator()

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={() => {
            return {
              headerShown: false
            }
          }}
        />
        <Stack.Screen
          name="GameScreen"
          component={GameScreen}
          options={({ route, navigation }) => {
            return {
              headerShown: false
            }
          }}
        />
        <Stack.Screen
          name="RateUs"
          component={RateUs}
          options={({ route, navigation }) => {
            return {
              title: 'Rate us',
              headerTintColor: theme.colors.pink,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24
              },
              headerStyle: {
                backgroundColor: theme.colors.background,
                shadowColor: 'transparent'
              },
              headerLeft: () => (
                <Button
                  px={20}
                  height="100%"
                  onPress={() => navigation.navigate('MenuBar')}
                >
                  <Left color={theme.colors.blue} />
                </Button>
              )
            }
          }}
        />
        <Stack.Screen
          name="MenuBar"
          component={MenuBar}
          options={({ route, navigation }) => {
            return {
              title: 'Menu',
              headerTintColor: theme.colors.pink,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24
              },
              headerStyle: {
                backgroundColor: theme.colors.background,
                shadowColor: 'transparent'
              },
              headerLeft: () => (
                <Button
                  px={20}
                  height="100%"
                  onPress={() => navigation.navigate('GameScreen')}
                >
                  <Left color={theme.colors.blue} />
                </Button>
              )
            }
          }}
        />
        <Stack.Screen
          name="Challenges"
          component={ChallengeScreen}
          options={({ route, navigation }) => {
            return {
              title: route.params?.title,
              headerTintColor: theme.colors.pink,
              headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 24
              },
              headerStyle: {
                backgroundColor: theme.colors.background,
                shadowColor: 'transparent'
              },
              headerLeft: () => (
                <Button
                  px={20}
                  height="100%"
                  onPress={() => navigation.navigate('HomeScreen')}
                >
                  <Left color={theme.colors.blue} />
                </Button>
              )
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
