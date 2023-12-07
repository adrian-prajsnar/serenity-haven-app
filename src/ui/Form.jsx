import styled, { css } from 'styled-components';

const Form = styled.form`
  ${props =>
    props.type === 'regular' &&
    css`
      padding: 2.4rem 4rem;

      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 750px) {
        padding: 1.2rem 2rem;
      }
    `}

  ${props =>
    props.placed === 'loginPage' &&
    css`
      @media (max-width: 1000px) {
        background-color: var(--backdrop-color-grey-0);
      }
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: 'regular',
};

export default Form;
