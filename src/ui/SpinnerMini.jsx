import styled, { keyframes } from 'styled-components';
import { BiLoaderAlt } from 'react-icons/bi';

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: ${props => (props.buttonLarge ? '2.4rem' : '2.1rem')};
  height: ${props => (props.buttonLarge ? '2.4rem' : '2.1rem')};
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
