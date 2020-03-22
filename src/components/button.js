import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {
  compose,
  borderRadius,
  color,
  flexbox,
  layout,
  position,
  size,
  space,
} from 'styled-system';

const Button = styled(TouchableOpacity)(
  // eslint-disable-next-line prettier/prettier
  compose(borderRadius, color, flexbox, layout, position, size, space),
);

Button.defaultProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

export default Button;
