import * as React from 'react'

import Box from '../components/box'
import Text from '../components/text'
import theme from '../utils/theme'

function MenuBar() {
  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Text color={theme.colors.white} fontSize={29} ml={30} mt={76}>
        Sound
      </Text>
    </Box>
  )
}

export default MenuBar
