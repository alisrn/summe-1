import * as React from 'react'
import { Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

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
    height: WINDOW_HEIGHT / 14.93,
    resizeMode: 'contain'
    //marginTop: 10
    //marginLeft: -20
  },
  iconStyle: {
    marginRight: WINDOW_WIDTH / 5.91,
    height: WINDOW_HEIGHT / 25.6,
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
