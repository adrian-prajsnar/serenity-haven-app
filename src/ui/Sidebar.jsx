import styled from 'styled-components';

import Logo from './Logo';
import MainNav from './MainNav';
import Uploader from '../data/Uploader';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  overflow-y: auto;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.2rem;

  @media (max-width: 1000px) {
    padding: 1.6rem 4.8rem;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
  }

  @media (max-width: 750px) {
    padding: 1.6rem 2.4rem;
  }

  @media (max-width: 550px) {
    padding: 1.6rem 1.2rem;
  }
`;

const MainSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const ResponsiveComponentWrapper = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <MainSidebarContainer>
        <ResponsiveComponentWrapper>
          <Logo />
        </ResponsiveComponentWrapper>

        <MainNav />
      </MainSidebarContainer>

      <ResponsiveComponentWrapper>
        <Uploader />
      </ResponsiveComponentWrapper>
    </StyledSidebar>
  );
}

export default Sidebar;
