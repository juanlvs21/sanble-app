import { Outlet } from "react-router-dom";
import { styled } from "@mui/system";

import { AuthTabs } from "@/components/auth/Tabs";

const AuthView = styled("section")(
  ({ theme }) => `
  display: block;
  margin: 0;
  transition: all 300ms ease-in-out;

  @media (min-width: 768px) {
    background-color: ${theme.palette.primary.main};
    min-height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
  }
`
);
const Container = styled("div")(
  ({ theme }) => `
    width: 100%;
    height: auto;
    background-image: url("/img/wave2.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
    display: block;
    margin: auto;
    transition: all 300ms ease-in-out;

    @media (min-width: 768px) {
      width: 700px;
      border: 2px solid ${theme.palette.primary.main};
      border-radius: 24px;
      -webkit-box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.3);
      box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.3);
      height: auto;
      overflow-x: hidden;
      overflow-y: hidden;
      background-color: #fff;
    }
`
);
const LogoContainer = styled("picture")(
  ({ theme }) => `
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease-in-out;

  & img {
    width: 40px;

    @media (min-width: 320px) {
      width: 50px;
    }
    @media (min-width: 360px) {
      width: 63.3px;
    }
  }
  & span {
    font-size: 30px;
    font-weight: 700;
    margin-left: 10px;
    color: ${theme.palette.primary.main};
    font-family: var(--sb-font-family);

    @media (min-width: 360px) {
      font-size: 45px;
    }
  }

  @media (min-width: 360px) {
    height: 150px;
  }
`
);
const Margin = styled("div")`
  @media (min-width: 768px) {
    margin: 20px;
  }
`;

export const AuthLayout: React.FC = () => (
  <>
    <AuthView>
      <Margin>
        <Container>
          <LogoContainer>
            <img src="/img/logo.svg" alt="Sanble Logo" />
            <span>Sanble</span>
          </LogoContainer>
          <section className="content-container">
            <AuthTabs />
            <Outlet />
          </section>
        </Container>
      </Margin>
    </AuthView>
  </>
);
