import * as React from 'react'
import { Image } from 'react-native'

import Box from '../components/box'
import SumList from '../components/sum-list'
import TaleList from '../components/tale-list'
import Text from '../components/text'
import theme from '../utils/theme'

import { levels } from '../helpers/levels'

import { Scoreboard, Stopwatch } from '../components/icons'

function GameScreen(props) {
  const [firstPressIndex, setFirstPressIndex] = React.useState(null)
  const [numList, setNumList] = React.useState([])
  const [sumList, setSumList] = React.useState([])
  const configuredLevel = levels.find(x => x.level === props.route.params.data)

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

  const generateNum = () => {
    let sum = 0
    const defList = []
    const forSumList = []
    for (let i = 0; i < configuredLevel.total; i++) {
      defList.push(Math.round(Math.random() * 10))
      if (i < configuredLevel.colNum) {
        forSumList.push(defList[i])
      } else {
        forSumList[i % configuredLevel.colNum] += defList[i]
      }
      sum += defList[i]
    }
    if (sum % configuredLevel.colNum !== 0) {
      generateNum()
      return
    }

    setNumList(defList)
    setSumList(forSumList)
  }

  React.useEffect(() => {
    generateNum()
  }, [])

  return (
    <Box flex={1} backgroundColor={theme.colors.background}>
      <Box mt={10} flexDirection="row" alignItems="center">
        <Text fontSize={18} color={theme.colors.pink} ml={20} mr={15}>
          LEVEL - 3x3
        </Text>
        <Image source={require('../assets/bar.png')} />
      </Box>

      <Box mt={165}>
        <Box ml={50}>{taleListObj}</Box>
      </Box>

      <Box
        borderWidth={2}
        borderColor={theme.colors.pink}
        width={325}
        ml={40}
        mt={25}
      />

      <Box ml={50}>
        <SumList sumList={sumList} columnCount={configuredLevel.colNum} />
      </Box>

      <Box flexDirection="row" mt={90}>
        <Box ml={130} alignItems="center">
          <Scoreboard />
          <Text fontSize={18} color={theme.colors.pink} mt={10}>
            00:25
          </Text>
        </Box>
        <Box ml={40} alignItems="center">
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
