import * as React from 'react'
import { Image } from 'react-native'

import Box from '../components/box'
import GameBox from '../components/game-box'
import Text from '../components/text'
import theme from '../utils/theme'

import { Scoreboard, Stopwatch } from '../components/icons'

function GameScreen() {
  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Box mt={10} flexDirection="row" alignItems="center">
        <Text fontSize={18} color={theme.colors.pink} ml={20} mr={15}>
          LEVEL - 3x3
        </Text>
        <Image source={require('../assets/bar.png')} />
      </Box>

      <Box mt={165}>
        <Box flexDirection="row">
          <GameBox>0</GameBox>
          <GameBox ml={20}>4</GameBox>
          <GameBox ml={20}>5</GameBox>
        </Box>
        <Box flexDirection="row" mt={20}>
          <GameBox>2</GameBox>
          <GameBox ml={20}>7</GameBox>
          <GameBox ml={20}>3</GameBox>
        </Box>
        <Box flexDirection="row" mt={20}>
          <GameBox>1</GameBox>
          <GameBox ml={20}>8</GameBox>
          <GameBox ml={20}>6</GameBox>
        </Box>
      </Box>

      <Box
        borderWidth={2}
        borderColor={theme.colors.pink}
        width={325}
        ml={40}
        mt={25}
      />

      <Box flexDirection="row" mt={20}>
        <GameBox>3</GameBox>
        <GameBox ml={20}>19</GameBox>
        <GameBox ml={20}>14</GameBox>
      </Box>

      <Box flexDirection="row" mt={90}>
        <Box ml={130} alignItems="center">
          <Scoreboard />
          <Text fontSize={18} color={theme.colors.pink}>
            00:25
          </Text>
        </Box>
        <Box ml={40} alignItems="center">
          <Stopwatch />
          <Text fontSize={18} color={theme.colors.pink}>
            1278
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default GameScreen
