import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  min-width: 22.1rem;

  @media (max-width: 450px) {
    min-width: auto;
  }
`;

export default Input;
