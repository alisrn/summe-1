import React from 'react'
import { Image, Text, StyleSheet } from 'react-native'
import Box from './box'

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
    height: 40,
    resizeMode: 'contain',
    marginTop: 10
  },
  iconStyle: {
    alignSelf: 'flex-start',
    height: 60,
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
