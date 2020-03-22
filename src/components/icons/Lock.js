import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgLock(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className=""
      {...props}
    >
      <Path
        d="M20.5 9H19V7c0-3.86-3.14-7-7-7S5 3.14 5 7v2H3.5a.5.5 0 00-.5.5V22c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V9.5a.5.5 0 00-.5-.5zm-7.003 10.445A.501.501 0 0113 20h-2a.5.5 0 01-.497-.555l.315-2.837A1.978 1.978 0 0110 15c0-1.103.897-2 2-2s2 .897 2 2c0 .646-.306 1.236-.818 1.608l.315 2.837zM16 9H8V7c0-2.206 1.794-4 4-4s4 1.794 4 4v2z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgLock
