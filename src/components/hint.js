import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

function Hint(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress()
      }}
    >
      <Image
        source={require('../assets/designs/Hint_button.png')}
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
    height: 60,
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

export default Hint
