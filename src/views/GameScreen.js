import * as React from 'react'
import { Image, Dimensions } from 'react-native'

import Box from '../components/box'
import SumList from '../components/sum-list'
import TaleList from '../components/tale-list'
import Text from '../components/text'
import theme from '../utils/theme'

import { levels } from '../helpers/levels'

import { Scoreboard, Stopwatch } from '../components/icons'

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

function GameScreen(props) {
  const [firstPressIndex, setFirstPressIndex] = React.useState(null)
  const [numList, setNumList] = React.useState([])
  const [sumList, setSumList] = React.useState([])
  const [result, setResult] = React.useState(false)
  const configuredLevel = levels.find(x => x.level === props.route.params.data)
  console.log(configuredLevel);
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
    }
  }
  const allEqual = arr => arr.every(v => v === arr[0])
  const setNewListAndSumList = defList => {
    let forSumList = []
    for (let i = 0; i < configuredLevel.total; i++) {
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
      setResult(true);
      alert("Ula saa helal olsun.")
      props.route.params.updateUserLevel(configuredLevel.level + 1)
    }
  }

  const foo = []
  for (let i = 0; i < configuredLevel.rowNum; i++) foo.push(i)

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
  const generate = (max, thecount) => {
    var r = [];
    var currsum = 0;
    for (var i = 0; i < thecount - 1; i++) {
      r[i] = randombetween(1, max - (thecount - i - 1) - currsum);
      currsum += r[i];
    }
    r[thecount - 1] = max - currsum;
    return r;
  }

  const randombetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  }
  const generateNum = () => {
    let sum = 0
    const defList = []
    const forSumList = []
    let maxNum = Math.floor(Math.random() * configuredLevel.minNum) + configuredLevel.maxNum - configuredLevel.minNum
    for (let i = 0; i < configuredLevel.colNum; i++) {
      defList.push(...generate(maxNum, configuredLevel.rowNum))
      /* defList.push(Math.round(Math.random() * 10))
      if (i < configuredLevel.colNum) {
        forSumList.push(defList[i])
      } else {
        forSumList[i % configuredLevel.colNum] += defList[i]
      }
      sum += defList[i] */
    }
    shuffle(defList)
    setNewListAndSumList(defList)
  }

  React.useEffect(() => {
    generateNum()
  }, [])

  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Box mt={10} flexDirection="row" alignItems="center">
        <Text fontSize={18} color={theme.colors.pink} ml={20} mr={15}>
          LEVEL {configuredLevel.level} - {configuredLevel.colNum} x {configuredLevel.rowNum}
        </Text>
        <Image source={require('../assets/bar.png')} />
      </Box>

      <Box mt={140}>
        <Box alignItems='center' >{taleListObj}</Box>
      </Box>

      <Box
        alignSelf='center'
        borderWidth={2}
        borderColor={theme.colors.pink}
        width={WINDOW_WIDTH - 80}
        mt={25 - (configuredLevel.colNum - 3) * 5}
      />

      <Box ml={50}>
        <SumList sumList={sumList} columnCount={configuredLevel.colNum} />
      </Box>

      <Box flexDirection="row" top={WINDOW_HEIGHT - 200} left={WINDOW_WIDTH / 2 - 64} position='absolute'>
        <Box alignItems="center">
          <Scoreboard />
          <Text fontSize={18} color={theme.colors.pink} mt={10}>
            00:25
          </Text>
        </Box>
        <Box ml={40} alignItems="center" >
          <Stopwatch />
          <Text fontSize={18} color={theme.colors.pink} mt={10}>
            1278
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default GameScreen
