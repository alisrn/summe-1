import * as React from 'react'

import { Switch } from 'react-native'

import Box from '../components/box'
import Text from '../components/text'
import theme from '../utils/theme'

function MenuBar() {
  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Box>
        <Box flexDirection="row" mt={76} justifyContent="space-between" mr={16}>
          <Text color={theme.colors.pink} fontSize={24} ml={30}>
            Sound
          </Text>
          <Switch
            thumbColor={theme.colors.pink}
            trackColor={{ false: 'tranparent', true: theme.colors.blue }}
            value={false}
          />
        </Box>
        <Box flexDirection="row" mt={25} justifyContent="space-between" mr={16}>
          <Text color={theme.colors.pink} fontSize={24} ml={30}>
            Music
          </Text>
          <Switch
            thumbColor={theme.colors.pink}
            trackColor={{ false: 'tranparent', true: theme.colors.blue }}
            value={true}
          />
        </Box>
        <Text color={theme.colors.pink} fontSize={24} ml={30} mt={25}>
          Challenges
        </Text>
        <Text color={theme.colors.pink} fontSize={24} ml={30} mt={25}>
          How to play
        </Text>
        <Text color={theme.colors.pink} fontSize={24} ml={30} mt={25}>
          Rate to us
        </Text>
      </Box>
      <Box
        flex={1}
        mr={16}
        mb={75}
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Text flex color={theme.colors.purple} fontSize={24}>
          Restart
        </Text>
      </Box>
    </Box>
  )
}

export default MenuBar
