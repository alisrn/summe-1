import React, { Component } from 'react'
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
    //alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textbgStyle: {
    height: 40,
    resizeMode: 'contain',
    position: 'absolute'
    //marginTop: 10
    //marginLeft: -20
  },
  iconStyle: {
    marginRight: 100,
    height: 70,
    resizeMode: 'contain'
    //position: 'absolute'
  },
  textStyle: {
    color: 'white',
    position: 'absolute',
    fontSize: 24,
    paddingLeft: 20
  }
})

export default TimerCountdown
