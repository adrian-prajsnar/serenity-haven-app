import styled from 'styled-components';

const WrappingRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

export default WrappingRow;
