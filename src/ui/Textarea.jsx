import styled from 'styled-components';

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  min-width: 22.1rem;
  max-width: 43.6rem;
  height: 10rem;

  @media (max-width: 1000px) {
    max-width: 35rem;
  }

  @media (max-width: 875px) {
    max-width: 29rem;
  }

  @media (max-width: 620px) {
    max-width: 100%;
  }
`;

export default Textarea;
