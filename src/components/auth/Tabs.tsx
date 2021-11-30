import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";

const Container = styled("div")`
  display: flex;
`;
const Tab = styled(Link)(
  ({ theme }) => `
  width: 100%;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  transition: all 300ms ease-in-out;
  color: #e1e1e1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-family: ${theme.typography.fontFamily};

  &:hover {
    font-weight: 700;
    font-size: 19px;
    color: #3a3535d6;
  }

  &.active {
    color: ${theme.palette.primary.main};
  }
`
);
const Line = styled("div")`
  width: 100%;
  height: 7px;
  background-color: #e1e1e1;
  position: relative;
`;
const LineActive = styled("div")(
  ({ theme }) => `
    background-color: ${theme.palette.primary.main};
    width: 50%;
    height: 7px;
    position: absolute;
    border-radius: 45px;
    transition: left 300ms ease-in-out;

    &.left{
        left: 0;
    }
    &.right {
        left: 50vw;

        @media (min-width: 768px) {
            left: 350px;
        }
    }
`
);

export const AuthTabs: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Container>
        <Tab
          to="/auth/signin"
          className={pathname === "/auth/signin" ? "active" : ""}
        >
          Ingresar
        </Tab>
        <Tab
          to="/auth/signup"
          className={pathname === "/auth/signup" ? "active" : ""}
        >
          Registrarse
        </Tab>
      </Container>
      <Line>
        <LineActive
          className={pathname === "/auth/signin" ? "left" : "right"}
        />
      </Line>
    </>
  );
};
