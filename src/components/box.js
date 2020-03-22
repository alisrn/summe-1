import {View} from 'react-native';
import styled from 'styled-components';
import {
  compose,
  border,
  borderRadius,
  color,
  size,
  flexbox,
  space,
} from 'styled-system';

const Box = styled(View)(
  // eslint-disable-next-line prettier/prettier
  compose(border, borderRadius, color, size, flexbox, space),
);

export default Box;
