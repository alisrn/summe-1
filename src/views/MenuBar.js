import * as React from 'react'

import { Switch } from 'react-native'

import Button from '../components/button'
import Box from '../components/box'
import Text from '../components/text'
import theme from '../utils/theme'

function MenuBar(props) {
  const [soundValue, setSoundValue] = React.useState(false)
  const [musicValue, setMusicValue] = React.useState(false)

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
            value={soundValue}
            onChange={() => setSoundValue(!soundValue)}
          />
        </Box>
        <Box flexDirection="row" mt={25} justifyContent="space-between" mr={16}>
          <Text color={theme.colors.pink} fontSize={24} ml={30}>
            Music
          </Text>
          <Switch
            thumbColor={theme.colors.pink}
            trackColor={{ false: 'tranparent', true: theme.colors.blue }}
            value={musicValue}
            onChange={() => setMusicValue(!musicValue)}
          />
        </Box>
        <Button
          ml={30}
          mt={25}
          onPress={() => props.navigation.navigate('Challenges')}
        >
          <Text color={theme.colors.pink} fontSize={24}>
            Challenges
          </Text>
        </Button>
        <Button ml={30} mt={25}>
          <Text color={theme.colors.pink} fontSize={24}>
            How to play
          </Text>
        </Button>
        <Button
          ml={30}
          mt={25}
          onPress={() => props.navigation.navigate('RateUs')}
        >
          <Text color={theme.colors.pink} fontSize={24}>
            Rate to us
          </Text>
        </Button>
      </Box>
      <Box
        flex={1}
        mr={16}
        mb={75}
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Button onPress={() => props.navigation.navigate('GameScreen')}>
          <Text color={theme.colors.purple} fontSize={24}>
            Restart
          </Text>
        </Button>
      </Box>
    </Box>
  )
}

export default MenuBar
