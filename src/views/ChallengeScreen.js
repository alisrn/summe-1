/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { StatusBar } from 'react-native'
import { StyleSheet, Text } from 'react-native'

import Button from '../components/button'
import Box from '../components/box'
import { Tick, Lock } from '../components/icons'

function ChallengeScreen({ navigation }) {
  return (
    <Box style={styles.challengeScreen}>
      <StatusBar barStyle="light-content" />
      <Box>
        <Box style={{ flex: 1, alignSelf: 'center', marginTop: 150 }}>
          <Button
            justifyContent="center"
            mt={50}
            width={350}
            height={51}
            borderRadius="full"
            bg="#5648E3"
            onPress={() => navigation.navigate('GameScreen', { data: 2 })}
          >
            <Text style={styles.buttonText}>Challenge-1</Text>
            <Tick right={18} top={16} position="absolute" color="white" />
          </Button>
          <Button
            justifyContent="center"
            mt={15}
            width={350}
            height={51}
            borderRadius="full"
            bg="#F433A0"
          >
            <Text style={styles.buttonText}>Challenge-2</Text>
          </Button>

          <Button
            justifyContent="center"
            mt={15}
            width={350}
            height={51}
            borderRadius="full"
            bg="#BA3EE3"
          >
            <Lock right={18} top={13} position="absolute" color="white" />
            <Text style={styles.buttonText}>Challenge-3</Text>
          </Button>
          <Button
            justifyContent="center"
            mt={15}
            width={350}
            height={51}
            borderRadius="full"
            bg="#BA3EE3"
          >
            <Lock right={18} top={13} position="absolute" color="white" />
            <Text style={styles.buttonText}>Challenge-4</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  challengeScreen: {
    flex: 1,
    backgroundColor: '#1F252D'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default ChallengeScreen
