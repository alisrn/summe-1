import * as React from 'react'

import { Switch } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Button from '../components/button'
import Box from '../components/box'
import Text from '../components/text'
import theme from '../utils/theme'

function MenuBar(props) {
  const [soundValue, setSoundValue] = React.useState(
    global.userPreferences ? global.userPreferences.sound : true
  )
  const [musicValue, setMusicValue] = React.useState(
    global.userPreferences ? global.userPreferences.music : true
  )

  React.useEffect(() => {
    if (
      global.userPreferences === undefined ||
      global.userPreferences === null
    ) {
      getUserPreferences()
    }
  }, [])

  const getUserPreferences = async () => {
    try {
      global.userPreferences = await AsyncStorage.getItem('USER_PREFERENCES')
      global.userPreferences = JSON.parse(global.userPreferences)
      setSoundValue(global.userPreferences.sound)
      setMusicValue(global.userPreferences.music)
    } catch (e) {
      // saving error
      console.log('there is an error on getting user PREFERENCE.')
      console.log(e)
    }
  }

  const updateUserPreferences = async (sound, music) => {
    global.userPreferences.sound = sound
    global.userPreferences.music = music
    setMusicValue(music)
    setSoundValue(sound)

    try {
      await AsyncStorage.setItem(
        'USER_PREFERENCES',
        JSON.stringify(global.userPreferences)
      )
    } catch (e) {
      // saving error
      console.log('there is an error on save preferences.')
    }
  }

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
            onChange={() => updateUserPreferences(!soundValue, musicValue)}
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
            onChange={() => updateUserPreferences(soundValue, !musicValue)}
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
    </Box>
  )
}

export default MenuBar
