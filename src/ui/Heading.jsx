import styled, { css } from 'styled-components';

const Heading = styled.h1`
  line-height: 1.4;

  ${props =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;

      @media (max-width: 550px) {
        text-align: center;
      }
    `}

  ${props =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

  ${props =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;

      @media (max-width: 550px) {
        text-align: center;
      }
    `}

  ${props =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
    `}

  ${props =>
    props.as === 'h5' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  ${props =>
    props.as === 'h6' &&
    css`
      font-size: 1.8rem;
      font-weight: 700;
    `}
`;

export default Heading;
