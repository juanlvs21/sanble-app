import { Link, Outlet } from "react-router-dom";
import { styled } from "@mui/system";
import { IconButton, Tooltip } from "@mui/material";
import { FiHome } from "react-icons/fi";

import { LoadingFullScreen } from "@/components/common/LoadingFullScreen";
import { AuthTabs } from "@/components/auth/Tabs";
import { useApp } from "@/hooks/useApp";

const AuthView = styled("section")(
  ({ theme }) => `
  display: block;
  margin: 0;
  transition: all 300ms ease-in-out;

  @media (min-width: 768px) {
    background-color: ${theme.palette.primary.main};
    min-height: 100vh;
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
const Padding = styled("div")`
  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const HomeBtn = styled(IconButton)({
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 100,
  minWidth: 50,
  height: 50,
});

export const AuthLayout: React.FC = () => {
  const { loading } = useApp();

  return (
    <>
      <Link to="/in">
        <Tooltip title="Ir al inicio" placement="right">
          <HomeBtn color="secondary">
            <FiHome size={25} />
          </HomeBtn>
        </Tooltip>
      </Link>
      <AuthView>
        <Padding>
          <Container>
            <LogoContainer>
              <img src="/img/logo.svg" alt="Sanble Logo" />
              <span>Sanble</span>
            </LogoContainer>
            <main>
              <AuthTabs />
              <Outlet />
            </main>
          </Container>
        </Padding>
      </AuthView>

      <LoadingFullScreen loading={loading} />
    </>
  );
};
