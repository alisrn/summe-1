import * as React from 'react'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

function SvgStarFilled(props) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      className=""
      {...props}
    >
      <G clipPath="url(#star-filled_svg__clip0)">
        <Path
          d="M49.869 19.178a2.654 2.654 0 00-2.285-1.825l-14.434-1.31-5.704-13.355a2.658 2.658 0 00-4.89 0l-5.704 13.354-14.436 1.31a2.662 2.662 0 00-1.51 4.65l10.91 9.568L8.6 45.739a2.657 2.657 0 003.955 2.873L25 41.17l12.444 7.442c.912.545 2.06.495 2.923-.13A2.657 2.657 0 0041.4 45.74l-3.217-14.17 10.91-9.566a2.66 2.66 0 00.776-2.825z"
          fill="#F433A0"
        />
      </G>
      <Defs>
        <ClipPath id="star-filled_svg__clip0">
          <Path fill="#fff" d="M0 0h50v50H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgStarFilled
