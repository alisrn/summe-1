import * as React from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
const WINDOW_WIDTH = Dimensions.get('window').width

function Hint(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress()
      }}
    >
      <Image
        source={require('../assets/designs/hint.png')}
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
    height: WINDOW_WIDTH / 6.9,
    resizeMode: 'contain'
    //marginTop: 10
    //marginLeft: -20
  }
})

export default Hint
