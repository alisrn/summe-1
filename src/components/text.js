import { Text as T } from 'react-native'
import styled from 'styled-components'
import { compose, typography, color, size, space } from 'styled-system'

// eslint-disable-next-line prettier/prettier
const Text = styled(T)(compose(color, size, typography, space))

export default Text
