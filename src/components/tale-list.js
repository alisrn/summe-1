import * as React from 'react'
import { Dimensions } from 'react-native'

import GameBox from './game-box'
import Box from './box'

const WINDOW_WIDTH = Dimensions.get('window').width

function TaleList(props) {
  const gameBoxSize =
    (WINDOW_WIDTH -
      (WINDOW_WIDTH / 16.56 -
        (Math.max(props.columnCount, props.rowCount) - 3) * 5) *
        (Math.max(props.columnCount, props.rowCount) - 1) -
      (props.columnCount < props.rowCount
        ? (WINDOW_WIDTH / 16.56) * 2
        : (WINDOW_WIDTH / 16.56) * 3)) /
    Math.max(props.columnCount, props.rowCount)

  const foo = []
  for (let i = 0; i < props.columnCount; i++) {
    foo.push(i)
  }
  const taleObj = foo.map((x, index) => {
    let isOnHint = false
    if (props.hintedTales) {
      isOnHint =
        JSON.stringify([props.index, index]) ===
          JSON.stringify(props.hintedTales.target) ||
        JSON.stringify([props.index, index]) ===
          JSON.stringify(props.hintedTales.replaced)
    }

    return (
      <GameBox
        ml={
          index === 0
            ? 0
            : WINDOW_WIDTH / 13.8 -
              (Math.max(props.columnCount, props.rowCount) - 3) * 5
        }
        mt={
          WINDOW_WIDTH / 13.8 -
          (Math.max(props.columnCount, props.rowCount) - 3) * 5
        }
        width={gameBoxSize}
        height={gameBoxSize}
        isOnHint={isOnHint}
        fontSize={
          42 -
          (Math.max(props.columnCount, props.rowCount) - 2) *
            (props.taleNumList[props.columnCount * props.index + index] >= 100
              ? 3
              : 2)
        }
        key={[props.index, index]}
        number={props.taleNumList[props.columnCount * props.index + index]}
        index={[props.index, index]}
        onTalePress={props.onTalePress}
        pressed={
          props.pressedIndex
            ? props.pressedIndex[0] === props.index &&
              props.pressedIndex[1] === index
            : false
        }
      />
    )
  })

  return <Box flexDirection="row">{taleObj}</Box>
}

export default TaleList
