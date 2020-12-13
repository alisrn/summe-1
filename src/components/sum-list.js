import * as React from 'react'

import TaleList from './tale-list'

function SumList(props) {
  return (
    <TaleList
      key={'sumList'}
      taleNumList={props.sumList}
      index={0}
      columnCount={props.columnCount}
      onTalePress={props.onTalePress}
    />
  )
}

export default SumList
