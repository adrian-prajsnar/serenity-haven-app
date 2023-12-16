import styled from 'styled-components';

const CheckboxForm = styled.input`
  position: relative;
  height: 2.4rem;
  width: 2.4rem;
  outline-offset: 2px;
  transform-origin: 0;
  accent-color: var(--color-brand-600);

  &:disabled {
    accent-color: var(--color-brand-600);
  }

  &:after {
    content: '${props => props.content || ''}';
    position: absolute;
    top: 1px;
    left: 3.4rem;
    width: max-content;
    font-style: italic;

    @media (max-width: 550px) {
      top: 2px;
    }
  }
`;

export default CheckboxForm;
