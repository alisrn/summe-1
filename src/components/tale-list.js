import * as React from 'react'
import { Dimensions } from 'react-native';

import GameBox from './game-box'
import Box from './box'

const WINDOW_WIDTH = Dimensions.get('window').width;

function TaleList(props) {
  //console.log(WINDOW_WIDTH); //414
  const gameBoxSize = (WINDOW_WIDTH - (25 - (props.columnCount-3)*5) * (props.columnCount-1) - 100) / props.columnCount
  //console.log(gameBoxSize); //414

  const foo = []
  for (let i = 0; i < props.columnCount; i++) foo.push(i)
  const taleObj = foo.map((x, index) => {
    return (
      <GameBox
        ml={index == 0 ? 0 :25-(props.columnCount-3)*5}
        mt={25-(props.columnCount-3)*5}
        width={gameBoxSize}
        height={gameBoxSize}
        fontSize={42 - (props.columnCount-2)*2}
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
