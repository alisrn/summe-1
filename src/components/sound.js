import * as React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

function Sound(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress()
      }}
      style={props.style}
    >
      <Image
        source={
          props.soundOn
            ? require('../assets/designs/Sound_on_button.png')
            : require('../assets/designs/Sound_off_button.png')
        }
        style={styles.textbgStyle}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    //alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textbgStyle: {
    height: 50,
    resizeMode: 'contain'
    //marginTop: 10
    //marginLeft: -20
  },
  iconStyle: {
    marginRight: 70,
    height: 35,
    resizeMode: 'contain'
    //position: 'absolute'
  },
  textStyle: {
    color: 'white',
    position: 'absolute',
    fontSize: 24
  }
})

export default Sound
