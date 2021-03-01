/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { StatusBar, Dimensions, FlatList } from 'react-native'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import Box from '../components/box'
import Text from '../components/text'
import ChallengeButton from '../components/challenge-button'

const WINDOW_HEIGHT = Dimensions.get('window').height
const WINDOW_WIDTH = Dimensions.get('window').width

function ChallengeScreen(props) {
  const [userLevel, setUserLevel] = React.useState(0)
  const [userPoint, setUserPoint] = React.useState(0)

  React.useEffect(() => {
    const getUserInfo = async () => {
      try {
        const level = await AsyncStorage.getItem('USER_LEVEL')
        setUserLevel(level ? parseInt(level) : 1)
        console.log('retrieved user level: ' + level)
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
    //await AsyncStorage.removeItem('USER_POINT')
    try {
      await AsyncStorage.setItem(
        'USER_POINT',
        (parseInt(userPoint) + parseInt(point)).toString()
      )
      console.log('earned user point: ' + parseInt(point))
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
      challengeButtonIndexList.push({ level: i + 1, id: i })
    }
  }

  const renderItem = ({ item }) => {
    if (userLevel > 0) {
      return (
        <ChallengeButton
          key={'challenge' + item.id}
          index={item.level}
          isLocked={userLevel < item.level}
          isPassed={userLevel > item.level}
          isDisabled={userLevel < item.level}
          onChallengePress={() =>
            props.navigation.navigate('GameScreen', {
              data: item.level,
              updateUserLevel: updateUserLevelAndPoint,
              userPoint: userPoint
            })
          }
        />
      )
    } else {
      null
    }
  }

  return (
    <Box style={styles.challengeScreen}>
      <StatusBar barStyle="light-content" />
      <Text
        style={{
          fontFamily: 'Starjedi',
          fontSize: 48,
          color: 'white',
          alignSelf: 'center',
          marginTop: 30
        }}
      >
        Stage {Math.floor(userLevel / 10)}
      </Text>
      <FlatList
        centerContent={true}
        data={challengeButtonIndexList}
        renderItem={renderItem}
        contentOffset={{
          x: 0,
          y:
            userLevel % 10 !== 0 && userLevel % 10 < 5
              ? 0
              : userLevel % 10 === 0
              ? 240
              : 50 + 80 * ((userLevel % 10) - 4)
        }}
        showsVerticalScrollIndicator={false}
        style={{
          maxHeight: (WINDOW_HEIGHT * 3) / 4,
          marginTop: 50,
          marginBottom: 100,
          maxwidth: WINDOW_WIDTH,
          alignContent: 'center',
          alignSelf: 'center'
        }}
      />
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
