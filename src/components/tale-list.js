import * as React from 'react'

import GameBox from './game-box'
import Box from './box'

function TaleList(props) {
  const foo = []
  for (let i = 0; i < props.columnCount; i++) foo.push(i)
  const taleObj = foo.map((x, index) => {
    return (
      <GameBox
        ml={25}
        mt={20}
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
