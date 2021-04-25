import * as React from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import Text from './text'
import Box from './box'
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
function Score(props) {
  return (
    <Box style={[styles.container, { ...props.style }]}>
      <Image
        source={require('../assets/designs/Text_bg.png')}
        style={styles.textbgStyle}
      />
      <Image
        source={require('../assets/designs/Star_icon.png')}
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
    height: WINDOW_HEIGHT / 19.91,
    resizeMode: 'contain',
    position: 'absolute'
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
    alignSelf: 'flex-end',
    paddingRight: WINDOW_WIDTH / 82.8,
    position: 'absolute',
    fontSize: 18
  }
})

export default Score
