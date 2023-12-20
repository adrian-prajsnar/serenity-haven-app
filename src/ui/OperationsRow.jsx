import styled from 'styled-components';

const OperationsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.2rem;

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

export default OperationsRow;
