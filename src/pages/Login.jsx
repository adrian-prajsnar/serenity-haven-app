import styled from 'styled-components';

import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const LoginContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  padding: 3.2rem 2.4rem;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  z-index: 1;

  @media (max-width: 1000px) {
    background-color: var(--backdrop-color);
  }

  @media (max-width: 550px) {
    grid-template-columns: 46rem;
  }

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

const BackgroundImg = styled.div`
  background-image: url('./login-bg.jpg');
  background-position: center;
  background-size: cover;

  @media (max-width: 1000px) {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
`;

const LogoBackground = styled.div`
  @media (max-width: 1000px) {
    padding: 0.8rem;
    margin: auto;
    background-color: var(--backdrop-color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);
  }
`;

const TextBackground = styled.span`
  @media (max-width: 1000px) {
    text-shadow: 0 0 15px var(--color-grey-0), 0 0 15px var(--color-grey-0),
      0 0 15px var(--color-grey-0), 0 0 15px var(--color-grey-0),
      0 0 15px var(--color-grey-0), 0 0 15px var(--color-grey-0),
      0 0 15px var(--color-grey-0), 0 0 15px var(--color-grey-0);
  }
`;

function Login() {
  return (
    <LoginLayout>
      <LoginContainer>
        <LogoBackground>
          <Logo />
        </LogoBackground>

        <TextBackground>
          <Heading as='h4'>Log in to your account</Heading>
        </TextBackground>

        <LoginForm />
      </LoginContainer>

      <BackgroundImg />
    </LoginLayout>
  );
}

export default Login;
