import * as React from 'react'
import { Image, Dimensions, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Box from '../components/box'
import Button from '../components/button'
import SumList from '../components/sum-list'
import TaleList from '../components/tale-list'
import Text from '../components/text'
import theme from '../utils/theme'
import TimerCountDown from '../components/time-counter'

import { levels } from '../helpers/levels'

import { Scoreboard, Stopwatch } from '../components/icons'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

function GameScreen(props) {
  const [firstPressIndex, setFirstPressIndex] = React.useState(null)
  const [numList, setNumList] = React.useState([])
  const [sumList, setSumList] = React.useState([])
  const [gamePoint, setGamePoint] = React.useState(2000)
  const [isProblemSolved, setIsProblemSolved] = React.useState(false)
  const [timer, setTimer] = React.useState(100)
  const configuredLevel = levels.find(x => x.level === props.route.params.data)
  const [leftMoveCount, setLeftMoveCount] = React.useState(20)

  const onTalePress = index => {
    if (firstPressIndex === undefined || firstPressIndex == null) {
      setFirstPressIndex(index)
    } else {
      let tempList = numList
      let firstIndex =
        firstPressIndex[0] * configuredLevel.colNum + firstPressIndex[1]
      let secondIndex = index[0] * configuredLevel.colNum + index[1]
      let temp1 = tempList[firstIndex]
      tempList[firstIndex] = tempList[secondIndex]
      tempList[secondIndex] = temp1
      setNewListAndSumList(tempList)
      if (firstIndex !== secondIndex) {
        setGamePoint(gamePoint - 100)
        props.navigation.setOptions({ title: leftMoveCount - 1 })
        setLeftMoveCount(leftMoveCount - 1)
      }
    }
  }
  const allEqual = arr => arr.every(v => v === arr[0])
  const setNewListAndSumList = React.useCallback(
    defList => {
      let forSumList = []
      for (
        let i = 0;
        i < configuredLevel.colNum * configuredLevel.rowNum;
        i++
      ) {
        if (i < configuredLevel.colNum) {
          forSumList.push(defList[i])
        } else {
          forSumList[i % configuredLevel.colNum] += defList[i]
        }
      }

      setSumList(forSumList)
      setNumList(defList)
      setFirstPressIndex(null)

      if (allEqual(forSumList)) {
        setIsProblemSolved(true)
        props.route.params.updateUserLevel(configuredLevel.level + 1, 10)
      }
    },
    [
      configuredLevel.colNum,
      configuredLevel.level,
      configuredLevel.rowNum,
      props.route.params
    ]
  )

  const foo = []
  for (let i = 0; i < configuredLevel.rowNum; i++) {
    foo.push(i)
  }

  const taleListObj = foo.map((x, index) => {
    return (
      <TaleList
        key={index}
        index={index}
        columnCount={configuredLevel.colNum}
        taleNumList={numList}
        onTalePress={onTalePress}
        pressedIndex={firstPressIndex}
      />
    )
  })
  const generate = React.useCallback((max, thecount) => {
    var r = []
    var currsum = 0
    for (var i = 0; i < thecount - 1; i++) {
      r[i] = randombetween(1, max - (thecount - i - 1) - currsum)
      currsum += r[i]
    }
    r[thecount - 1] = max - currsum
    return r
  }, [])
  const randombetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const shuffle = array => {
    array.sort(() => Math.random() - 0.5)
  }

  React.useEffect(() => {
    const generateNum = () => {
      const defList = []
      let maxNum =
        configuredLevel.minNum +
        Math.floor(
          Math.random() * (configuredLevel.maxNum - configuredLevel.minNum)
        )
      for (let i = 0; i < configuredLevel.colNum; i++) {
        defList.push(...generate(maxNum, configuredLevel.rowNum))
      }
      shuffle(defList)
      setNewListAndSumList(defList)
    }
    generateNum()
  }, [
    configuredLevel.colNum,
    configuredLevel.maxNum,
    configuredLevel.minNum,
    configuredLevel.rowNum,
    generate,
    setNewListAndSumList
  ])

  const onNext = () => {
    props.route.params.data = configuredLevel.level + 1
    setIsProblemSolved(false)
    setLeftMoveCount(20)
    props.navigation.setOptions({ title: 20 })
    setTimer(100)
  }
  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Modal
        isVisible={isProblemSolved}
        animationIn="slideInUp"
        animationInTiming={500}
        animationOut="slideOutDown"
        animationOutTiming={500}
        style={styles.nextProblemModal}
      >
        <Text style={styles.finish}>Mission Complished!</Text>

        <Box>
          <Button
            justifyContent="center"
            mt={15}
            width={WINDOW_WIDTH / 2}
            height={50}
            borderRadius="full"
            bg="#F433A0"
            onPress={onNext}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Button>
        </Box>
      </Modal>
      <Box mt={10} flexDirection="row" alignItems="center">
        <Text fontSize={18} color={theme.colors.pink} ml={20} mr={15}>
          LEVEL {configuredLevel.level} - {configuredLevel.colNum} x{' '}
          {configuredLevel.rowNum}
        </Text>
        <Image source={require('../assets/bar.png')} />
      </Box>
      <Box mt={configuredLevel.rowNum > configuredLevel.colNum ? 30 : 100}>
        <Box alignItems="center">{taleListObj}</Box>
      </Box>
      <Box
        alignSelf="center"
        borderWidth={2}
        borderColor={theme.colors.pink}
        width={WINDOW_WIDTH - 80}
        mt={25 - (configuredLevel.colNum - 3) * 5}
      />
      <Box ml={50}>
        <SumList sumList={sumList} columnCount={configuredLevel.colNum} />
      </Box>
      <Box
        flexDirection="row"
        top={WINDOW_HEIGHT - 200}
        left={WINDOW_WIDTH / 2 - 64}
        position="absolute"
      >
        <Box alignItems="center">
          <Scoreboard />
          <Text fontSize={18} color={theme.colors.pink} mt={10}>
            00:25
          </Text>
        </Box>
        <Box ml={40} alignItems="center">
          <Stopwatch />
          <TimerCountDown
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ fontSize: 18, color: theme.colors.pink, marginTop: 10 }}
            countFrom={timer}
          />
        </Box>
      </Box>
    </Box>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  finish: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Starjedi'
  },
  nextProblemModal: {
    backgroundColor: 'gray',
    height: WINDOW_HEIGHT / 2,
    maxHeight: WINDOW_HEIGHT / 2,
    width: (WINDOW_WIDTH * 5) / 6,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: WINDOW_HEIGHT / 4,
    borderRadius: 5
  }
})

export default GameScreen
