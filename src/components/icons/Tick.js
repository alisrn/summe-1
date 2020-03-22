import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

function SvgTick(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="currentColor"
      className=""
      {...props}
    >
      <G clipPath="url(#tick_svg__clip0)">
        <Path d="M15.765 2.36a.8.8 0 00-1.131 0l-9.585 9.584L1.365 8.26A.8.8 0 00.234 9.39l4.25 4.25a.8.8 0 001.131 0l10.15-10.15a.8.8 0 000-1.132z" />
      </G>
      <Defs>
        <ClipPath id="tick_svg__clip0">
          <Path d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgTick
