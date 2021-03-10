/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, Text } from 'react-native'

import theme from './utils/theme'

import Button from './components/button'

import HomeScreen from './views/HomeScreen'
import ChallengeScreen from './views/ChallengeScreen'
import GameScreen from './views/GameScreen'
import MenuBar from './views/MenuBar'
import RateUs from './views/RateUs'
import SvgLeft from './components/icons/Left'
import { justifyContent } from 'styled-system'

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
              headerShown: true,
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
                  height="100%"
                  style={{
                    marginLeft: 20,
                    width: '100%',
                    height: '100%'
                  }}
                  onPress={() => navigation.navigate('GameScreen')}
                >
                  <SvgLeft />
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
                />
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
                />
              )
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
