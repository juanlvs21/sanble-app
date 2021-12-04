import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const Container = styled("div")(
  ({ theme }) => `
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${theme.palette.primary.main};
  background-image: url("/img/wave1.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  `
);
const Content = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Welcome = styled(Typography)`
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 4px;
  margin-top: 10px;
  margin-bottom: 0;
`;
const Sanble = styled(Typography)`
  font-size: 45px;
  font-weight: 700;
  margin-top: 0;
`;

export const Splash: React.FC = () => (
  <Container className="animate__animated animate__fadeIn">
    <Content className="animate__animated animate__zoomIn">
      <img
        src="/img/logo.svg"
        alt="Sanble Logo"
        className="
          animate__animated animate__infinite animate__pulse
        "
        width={93}
        height={130}
      />
      <Welcome variant="h3">Bienvenido a</Welcome>
      <Sanble variant="h1">Sanble</Sanble>
    </Content>
  </Container>
);
