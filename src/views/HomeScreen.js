/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  Animated,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
  Easing,
  Image
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Button from '../components/button'
import Box from '../components/box'
//import bg from '../assets/bg'

const WINDOW_WIDTH = Dimensions.get('window').width

function HomeScreen(props) {
  let yValue = new Animated.Value(0)
  let scaleValue = new Animated.Value(0)
  let enteranceVal = new Animated.Value(0)
  const [userLevel, setUserLevel] = React.useState(0)
  const [userPoint, setUserPoint] = React.useState(0)

  React.useEffect(() => {
    const moveLR = () => {
      Animated.sequence([
        Animated.timing(enteranceVal, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(yValue, {
          delay: 700,
          toValue: -200,
          duration: 1000, // the duration of the animation
          easing: Easing.linear, // the style of animation
          useNativeDriver: true
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ]).start()
    }
    moveLR()
  })

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const level = await AsyncStorage.getItem('USER_LEVEL')
        setUserLevel(level ? parseInt(level) : 1)
        console.log('retrieved user level: ' + level)
      } catch (e) {
        // saving error
        console.log('there is an error on getting user level.')
        console.log(e)
      }
      try {
        const point = await AsyncStorage.getItem('USER_POINT')
        setUserPoint(point ? parseInt(point, 10) : 0)
        console.log('retrieved user point: ' + point)
      } catch (error) {
        console.log('there is an error on getting user point.')
        console.log(error)
      }
    }
    const getUserPreferences = async () => {
      try {
        global.userPreferences = await AsyncStorage.getItem('USER_PREFERENCES')
        global.userPreferences = JSON.parse(global.userPreferences)
        if (global.userPreferences === null) {
          global.userPreferences = {
            sound: true,
            music: true
          }
        }
        console.log(
          'retrieved user PREFERENCE: ' + JSON.stringify(global.userPreferences)
        )
      } catch (e) {
        // saving error
        console.log('there is an error on getting user PREFERENCE.')
        console.log(e)
      }
    }
    getUserPreferences()
    getUserInfo()
  }, [])

  const updateUserLevelAndPoint = async (level, point) => {
    if (level > userLevel) {
      setUserLevel(level)
      setUserPoint(point)
      try {
        await AsyncStorage.setItem('USER_LEVEL', level.toString())
        console.log('set user level: ' + level.toString())
      } catch (e) {
        // saving error
        console.log('there is an error on save level.')
      }
    }

    try {
      await AsyncStorage.setItem('USER_POINT', point.toString())
      console.log('earned user point: ' + point.toString())
    } catch (e) {
      // saving error
      console.log('there is an error on save point.')
      console.log(e)
    }
  }

  return (
    <Box style={styles.homePage}>
      <ImageBackground
        source={require('../assets/designs/start_bg.png')}
        style={styles.image}
      >
        <StatusBar barStyle="light-content" />
        <Box>
          <Animated.Image
            style={{
              alignSelf: 'center',
              marginTop: 100,
              transform: [{ translateY: yValue }],
              opacity: enteranceVal,
              height: 80,
              //width: 50,
              resizeMode: 'contain'
            }}
            source={require('../assets/designs/logo.png')}
          />

          <Box>
            <Animated.View
              style={{
                marginTop: -140,
                opacity: scaleValue,
                transform: [{ scale: scaleValue }]
              }}
            >
              <Button
                style={{
                  alignSelf: 'center',
                  width: WINDOW_WIDTH / 5,
                  borderRadius: 20,
                  justifyContent: 'center'
                }}
                onPress={() => {
                  if (userPoint && userPoint > 0) {
                    props.navigation.navigate('GameScreen', {
                      data: userLevel,
                      updateUserLevel: updateUserLevelAndPoint,
                      userPoint: userPoint
                    })
                  } else {
                    props.navigation.navigate('Intro', {
                      data: userLevel,
                      updateUserLevel: updateUserLevelAndPoint,
                      userPoint: userPoint
                    })
                  }
                }}
              >
                <Image
                  source={require('../assets/designs/Large_Play_button.png')}
                  style={{
                    height: 80,
                    resizeMode: 'contain'
                  }}
                />
              </Button>
            </Animated.View>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  )
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1
  },
  buttonText: {
    fontSize: 36,
    color: 'white',
    fontFamily: 'Starjedi',
    marginTop: -5
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }
})

export default HomeScreen
