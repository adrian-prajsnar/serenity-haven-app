import styled, { css } from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;

  ${props =>
    props.placed === 'loginPage' &&
    css`
      @media (max-width: 1000px) {
        background-color: var(--backdrop-color-grey-0);
      }
    `}
`;

export default Input;
