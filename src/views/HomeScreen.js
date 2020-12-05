/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  Animated,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Dimensions,
  Easing
} from 'react-native'

import Button from '../components/button'
import Box from '../components/box'
//import bg from '../assets/bg'

const WINDOW_WIDTH = Dimensions.get('window').width

function HomeScreen(props) {
  let yValue = new Animated.Value(0)
  let scaleValue = new Animated.Value(0)
  let enteranceVal = new Animated.Value(0)

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
  }, [enteranceVal, scaleValue, yValue])
  return (
    <Box style={styles.homePage}>
      <ImageBackground
        source={require('../assets/bg3.jpg')}
        style={styles.image}
      >
        <StatusBar barStyle="light-content" />
        <Box>
          <Animated.Image
            style={{
              alignSelf: 'center',
              marginTop: 100,
              transform: [{ translateY: yValue }],
              opacity: enteranceVal
            }}
            source={require('../assets/logo.png')}
          />

          <Box>
            <Animated.View
              style={{
                marginTop: -70,
                opacity: scaleValue
                /* transform: [{ scale: scaleValue }] */
              }}
            >
              <Button
                style={{
                  alignSelf: 'center',
                  //borderWidth: 1,
                  backgroundColor: '#ED36BA',
                  width: WINDOW_WIDTH / 2,
                  borderRadius: 20,
                  justifyContent: 'center'
                }}
                onPress={() => {
                  props.navigation.navigate('Challenges')
                }}
              >
                <Text style={[styles.buttonText]}>Play</Text>
              </Button>
              {/* <Button
                style={{ alignSelf: 'center' }}
                onPress={() => {
                  props.navigation.navigate('MenuBar')
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: '#3B4AE6', fontWeight: 'bold' }
                  ]}
                >
                  Menu
                </Text>
              </Button> */}
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
