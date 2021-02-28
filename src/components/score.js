import * as React from 'react'
import { Image, StyleSheet } from 'react-native'
import Text from './text'
import Box from './box'

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
    height: 45,
    resizeMode: 'contain',
    position: 'absolute'
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
    alignSelf: 'flex-end',
    paddingRight: 5,
    position: 'absolute',
    fontSize: 18
  }
})

export default Score
