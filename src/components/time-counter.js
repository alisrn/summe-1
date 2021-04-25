import React from 'react'
import { Image, Text, StyleSheet, Dimensions } from 'react-native'
import Box from './box'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

function TimerCountdown(props) {
  return (
    <Box style={[styles.container, { ...props.style }]}>
      <Image
        source={require('../assets/designs/Text_bg.png')}
        style={styles.textbgStyle}
      />
      <Image
        source={require('../assets/designs/Time_icon.png')}
        style={styles.iconStyle}
      />
      <Text style={styles.textStyle}>{props.point}</Text>
    </Box>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textbgStyle: {
    height: WINDOW_WIDTH / 10.35,
    resizeMode: 'contain',
    marginTop: WINDOW_HEIGHT / 89.6
  },
  iconStyle: {
    alignSelf: 'flex-start',
    height: WINDOW_WIDTH / 6.9,
    resizeMode: 'contain',
    position: 'absolute'
  },
  textStyle: {
    color: 'white',
    alignSelf: 'center',
    position: 'absolute',
    fontSize: 22
  }
})

export default TimerCountdown
