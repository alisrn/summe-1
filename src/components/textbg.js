import * as React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Text from './text'
import Box from './box'

function Textbg(props) {
  return (
    <Box style={[styles.container, { ...props.style }]}>
      <Image
        source={require('../assets/designs/Text_bg.png')}
        style={styles.textbgStyle}
      />
      <Text style={[styles.textStyle, { ...props.textStyle }]}>
        {props.level ? props.text + ' ' + props.level : props.text}
      </Text>
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
    position: 'absolute',
    fontSize: 20
  }
})

export default Textbg
