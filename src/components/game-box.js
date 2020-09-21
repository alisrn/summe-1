import * as React from 'react'

import Button from './button'
import Text from './text'
import theme from '../utils/theme'

function GameBox(props) {
  const onTalePress = () => {
    props.onTalePress(props.index)
  }

  return (
    <Button
      backgroundColor={props.pressed ? theme.colors.pink : theme.colors.box}
      borderRadius={5}
      width={props.width ? props.width : 75}
      height={props.height ? props.height : 75}
      alignItems="center"
      justifyContent="center"
      {...props}
      onPress={onTalePress}
    >
      <Text fontSize={props.fontSize ? props.fontSize : 42}>
        {props.number}
      </Text>
    </Button>
  )
}

export default GameBox
