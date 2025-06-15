import GlobalStyles from '../_shared/styles/GlobalStyles';
import { styled, ThemeProvider } from 'styled-components';
import { vars } from '@toolbox-ts/css';

import { BREAKPOINTS, PAGE_PADDING } from 'shared/constants';

import App from './three/App';

export default function Layout() {
  return (
    <ThemeProvider theme={vars}>
      <GlobalStyles />
      <App />
      {/* <Container>
        <Header />

        <Footer />
      </Container> */}
    </ThemeProvider>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: ${PAGE_PADDING};
  padding-bottom: ${PAGE_PADDING};
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;
{
  /* <StyledMain>
          <Hero>
            <h1>Code with depth. Systems with scale. Delivered fullstack.</h1>
            <p>
              B.S. Information Technology — Math & Engineering Focus | A.S.
              Computer & Electrical Engineering
            </p>
            <p>
              Open-minded lifelong learner driven by passion, purpose and
              curiosity.
            </p>
          </Hero>
        </StyledMain> */
}
