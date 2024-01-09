import styled, { css } from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24.2rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:last-child {
    display: flex;
    justify-content: end;
    gap: 1.2rem;
  }

  ${props =>
    props.type === 'regular' &&
    css`
      @media (max-width: 680px) {
        grid-template-columns: 11rem 1fr 1.2fr;
      }

      @media (max-width: 450px) {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        gap: 0.8rem;
      }
    `}

  ${props =>
    props.type === 'modal' &&
    css`
      @media (max-width: 815px) {
        grid-template-columns: 17rem 1fr 1.2fr;
      }

      @media (max-width: 720px) {
        grid-template-columns: 10rem 1fr 1.2fr;
      }

      @media (max-width: 630px) {
        display: flex;
        align-items: stretch;
        flex-direction: column;
        gap: 0.8rem;
      }
    `}
`;

StyledFormRow.defaultProps = {
  type: 'regular',
};

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, type }) {
  return (
    <StyledFormRow type={type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
