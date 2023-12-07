import styled from 'styled-components';

import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1000px) {
    justify-content: center;
  }

  @media (max-width: 750px) {
    padding: 1.6rem 2.4rem;
  }

  @media (max-width: 550px) {
    padding: 1.6rem 1.2rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
