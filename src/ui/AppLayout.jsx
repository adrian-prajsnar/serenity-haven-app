import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from './Sidebar';
import Header from './Header';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 750px) {
    padding: 3.2rem 2.4rem;
  }

  @media (max-width: 550px) {
    padding: 3.2rem 1.2rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
