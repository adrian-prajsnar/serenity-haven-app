import styled from 'styled-components';

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & img {
    height: 9.6rem;
    width: auto;
  }

  & span {
    font-family: Sono;
    font-weight: 600;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <img src='/logo.png' alt='Logo Serenity Haven' />
      <span>Serenity Haven</span>
    </StyledLogo>
  );
}

export default Logo;
