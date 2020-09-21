/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { StatusBar, Dimensions, ScrollView } from 'react-native'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Box from '../components/box'
import ChallengeButton from '../components/challenge-button'

const WINDOW_HEIGHT = Dimensions.get('window').height

function ChallengeScreen(props) {
  const [userLevel, setUserLevel] = React.useState(0)
  const [userPoint, setUserPoint] = React.useState(0)

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const level = await AsyncStorage.getItem('USER_LEVEL')
        setUserLevel(level ? parseInt(level) : 1)
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
    getUserInfo()
  }, [userLevel])

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

  const challengeButtonIndexList = []
  if (userLevel > 0) {
    for (
      let i = Math.floor((userLevel - 1) / 10) * 10;
      i < (Math.floor((userLevel - 1) / 10) + 1) * 10;
      i++
    ) {
      challengeButtonIndexList.push(i + 1)
    }
  }

  const challengeButtonList =
    userLevel > 0
      ? challengeButtonIndexList.map(x => {
        return (
          <ChallengeButton
            index={x}
            isLocked={userLevel < x}
            isPassed={userLevel > x}
            isDisabled={userLevel !== x}
            onChallengePress={() =>
              props.navigation.navigate('GameScreen', {
                data: x,
                updateUserLevel: updateUserLevelAndPoint,
                userPoint: userPoint
              })
            }
          />
        )
      })
      : null

  return (
    <Box style={styles.challengeScreen}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        centerContent={true}
        style={{
          maxHeight: (WINDOW_HEIGHT * 3) / 4,
          marginTop: 100,
          marginBottom: 100
        }}
      >
        <Box style={{ flex: 1, alignSelf: 'center' }}>
          {challengeButtonList}
        </Box>
      </ScrollView>
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
