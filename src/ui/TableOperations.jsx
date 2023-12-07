import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;

  @media (max-width: 550px) {
    justify-content: center;
  }
`;

export default TableOperations;
