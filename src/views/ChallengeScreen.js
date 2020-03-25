/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { StatusBar } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state'
])
import Button from '../components/button'
import Box from '../components/box'
import { Tick, Lock } from '../components/icons'

function ChallengeScreen(props) {
  const [userLevel, setUserLevel] = React.useState(1)
  const [userPoint, setUserPoint] = React.useState(0)

  React.useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const level = await AsyncStorage.getItem('USER_LEVEL')
      setUserLevel(level ? level : 1)
      console.log('retrieved user level: ' + level)
      console.log(userLevel)
    } catch (e) {
      // saving error
      console.log('there is an error on getting user level.')
      console.log(e)
    }
    try {
      const point = await AsyncStorage.getItem('USER_POINT')
      setUserPoint(point ? point : 0)
      console.log('retrieved user point: ' + point)
    } catch (error) {
      console.log('there is an error on getting user point.')
      console.log(error)
    }
  }

  const updateUserLevelAndPoint = async (level, point) => {
    if (level > userLevel) {
      setUserLevel(level)
      try {
        await AsyncStorage.setItem('USER_LEVEL', level.toString())
        console.log('set user level: ' + level.toString())
      } catch (e) {
        // saving error
        console.log('there is an error on save level.')
      }
    }

    setUserPoint(parseInt(userPoint) + parseInt(point))
    await AsyncStorage.removeItem('USER_POINT')
    console.log('removed')
    try {
      await AsyncStorage.setItem(
        'USER_POINT',
        (parseInt(userPoint) + parseInt(point)).toString()
      )
      console.log('set user POINT: ' + (userPoint + point))
    } catch (e) {
      // saving error
      console.log('there is an error on save point.')
      console.log(e)
    }
  }
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
            onPress={() =>
              props.navigation.navigate('GameScreen', {
                data: 1,
                updateUserLevel: updateUserLevelAndPoint,
                userPoint: userPoint
              })
            }
          >
            <Text style={styles.buttonText}>Challenge-1</Text>
            {userLevel > 1 ? (
              <Tick right={18} top={16} position="absolute" color="white" />
            ) : null}
          </Button>
          <Button
            justifyContent="center"
            mt={15}
            disabled={userLevel < 2}
            width={350}
            height={51}
            borderRadius="full"
            bg="#F433A0"
            onPress={() =>
              props.navigation.navigate('GameScreen', {
                data: 2,
                updateUserLevel: updateUserLevelAndPoint,
                userPoint: userPoint
              })
            }
          >
            {userLevel < 2 ? (
              <Lock right={18} top={13} position="absolute" color="white" />
            ) : null}
            <Text style={styles.buttonText}>Challenge-2</Text>
            {userLevel > 2 ? (
              <Tick right={18} top={16} position="absolute" color="white" />
            ) : null}
          </Button>

          <Button
            justifyContent="center"
            mt={15}
            disabled={userLevel < 3}
            width={350}
            height={51}
            borderRadius="full"
            bg="#BA3EE3"
            onPress={() =>
              props.navigation.navigate('GameScreen', {
                data: 3,
                updateUserLevel: updateUserLevelAndPoint,
                userPoint: userPoint
              })
            }
          >
            {userLevel < 3 ? (
              <Lock right={18} top={13} position="absolute" color="white" />
            ) : null}
            <Text style={styles.buttonText}>Challenge-3</Text>
            {userLevel > 3 ? (
              <Tick right={18} top={16} position="absolute" color="white" />
            ) : null}
          </Button>
          <Button
            justifyContent="center"
            mt={15}
            disabled={userLevel < 4}
            width={350}
            height={51}
            borderRadius="full"
            bg="#BA3EE3"
            onPress={() =>
              props.navigation.navigate('GameScreen', {
                data: 4,
                updateUserLevel: updateUserLevelAndPoint,
                userPoint: userPoint
              })
            }
          >
            {userLevel < 4 ? (
              <Lock right={18} top={13} position="absolute" color="white" />
            ) : null}
            <Text style={styles.buttonText}>Challenge-4</Text>
            {userLevel > 4 ? (
              <Tick right={18} top={16} position="absolute" color="white" />
            ) : null}
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
