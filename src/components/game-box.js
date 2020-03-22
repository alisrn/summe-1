import * as React from 'react'

import Button from './button'
import Text from './text'
import theme from '../utils/theme'

function GameBox({ children, ...props }) {
  return (
    <Button
      backgroundColor={theme.colors.box}
      borderRadius={5}
      width={75}
      height={75}
      ml={75}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Text fontSize={42}>{children}</Text>
    </Button>
  )
}

export default GameBox
