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
  background: linear-gradient(
    180deg,
    var(--color-grey-0) 0%,
    var(--color-grey-50) 100%
  );
  z-index: 1;

  @media (max-width: 550px) {
    grid-template-columns: 46rem;
    padding: 3.2rem 1.2rem;
  }

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

const LoginFooter = styled.p`
  font-size: 1.4rem;
  text-align: center;
  padding: 0 2.4rem;
  color: var(--color-grey-500);
`;

const BackgroundImg = styled.div`
  background-image: url('./login-bg.jpg');
  background-position: center;
  background-size: cover;

  @media (max-width: 1000px) {
    display: none;
  }
`;

function Login() {
  const currentYear = new Date().getFullYear();

  return (
    <LoginLayout>
      <LoginContainer>
        <Logo />
        <Heading as='h4'>Log in to your account</Heading>
        <LoginForm />
        <LoginFooter>
          &copy; {currentYear} Serenity Haven, Inc. All rights reserved.
        </LoginFooter>
      </LoginContainer>

      <BackgroundImg />
    </LoginLayout>
  );
}

export default Login;
