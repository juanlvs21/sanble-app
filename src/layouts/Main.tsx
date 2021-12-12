import { styled } from "@mui/system";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { NavbarDesktop } from "@/components/common/NavbarDesktop";
import { NavbarMobile } from "@/components/common/NavbarMobile";
import { DrawerDesktop } from "@/components/common/DrawerDesktop";

const Container = styled("div")`
  background-image: url("/img/wave5.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  &.isDeskto {
    flex-grow: 1;
    width: calc(100% - 240px);
    margin-left: 240px;
  }
`;
const Main = styled("main")`
  padding: 100px 40px 40px;

  @media (min-width: 768px) {
    padding: 20px 40px;
  }
`;

export const MainLayout: React.FC = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      {isDesktop && <DrawerDesktop />}
      <Container className={isDesktop ? "isDeskto" : ""}>
        {isDesktop ? <NavbarDesktop /> : <NavbarMobile />}
        <Main>
          <Outlet />
        </Main>
      </Container>
    </>
  );
};
