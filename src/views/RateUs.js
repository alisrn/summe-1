/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { Image } from 'react-native'
import { Star, StarFilled } from '../components/icons'
import Box from '../components/box'
import Button from '../components/button'
import theme from '../utils/theme'

function RateUs() {
  const [starCount, setStarCount] = React.useState(0)

  return (
    <Box
      flex={1}
      backgroundColor={theme.colors.background}
      alignItems="center"
      justifyContent="center"
    >
      <Image
        source={require('../assets/poop.png')}
        style={{ marginBottom: 80 }}
      />
      <Box flexDirection="row">
        <Button onPress={() => setStarCount(1)}>
          {starCount === 0 ? (
            <Star mt={20} style={{ marginRight: 15 }} />
          ) : (
            <StarFilled mt={20} style={{ marginRight: 15 }} />
          )}
        </Button>
        <Button onPress={() => setStarCount(2)}>
          {starCount >= 2 ? (
            <StarFilled mt={20} style={{ marginRight: 15 }} />
          ) : (
            <Star mt={20} style={{ marginRight: 15 }} />
          )}
        </Button>
        <Button onPress={() => setStarCount(3)}>
          {starCount >= 3 ? (
            <StarFilled mt={20} style={{ marginRight: 15 }} />
          ) : (
            <Star mt={20} style={{ marginRight: 15 }} />
          )}
        </Button>
        <Button onPress={() => setStarCount(4)}>
          {starCount >= 4 ? (
            <StarFilled mt={20} style={{ marginRight: 15 }} />
          ) : (
            <Star mt={20} style={{ marginRight: 15 }} />
          )}
        </Button>
        <Button onPress={() => setStarCount(5)}>
          {starCount >= 5 ? (
            <StarFilled mt={20} style={{ marginRight: 15 }} />
          ) : (
            <Star mt={20} style={{ marginRight: 15 }} />
          )}
        </Button>
      </Box>
    </Box>
  )
}

export default RateUs
