import * as React from 'react'

import Button from './button'
import Text from './text'
import { Image } from 'react-native'

function GameBox(props) {
  const onTalePress = () => {
    if (props.onTalePress) {
      props.onTalePress(props.index)
    }
  }

  return (
    <Button
      /* backgroundColor={
        props.pressed || props.isOnHint ? theme.colors.pink : theme.colors.box
        borderRadius={5}
      } */
      width={props.width ? props.width : 75}
      height={props.height ? props.height : 75}
      alignItems="center"
      justifyContent="center"
      {...props}
      onPress={onTalePress}
    >
      <Image
        source={
          props.pressed || props.isOnHint
            ? require('../assets/designs/Block_selected_state_200px.png')
            : require('../assets/designs/Block_item_200px.png')
        }
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: props.width ? props.width : 75,
          height: props.height ? props.height : 75,
          resizeMode: 'contain',
          position: 'absolute'
        }}
      />
      <Text fontSize={props.fontSize ? props.fontSize : 42}>
        {props.number}
      </Text>
    </Button>
  )
}

export default GameBox
