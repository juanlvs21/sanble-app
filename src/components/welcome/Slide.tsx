import { Box, styled } from "@mui/system";
import { Button, Typography } from "@mui/material";

const Container = styled(Box)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  display: grid;
  flex-direction: column;

  @media (min-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;
const Content = styled("div")`
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 30px;

  @media (min-width: 768px) {
    width: 600px;
    border-radius: 20px;
    min-height: auto;
  }
`;
const Title = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 15px;
`;
const SubTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  color: #23202080;
  padding: 0 20px;
  margin-top: 15px;
`;
const BtnContainer = styled("div")`
  height: 100px;
  padding: 0 30px 50px;

  @media (min-width: 768px) {
    width: 600px;
    border-radius: 20px;
  }
`;

export type ComponentProps = {
  /**
   * Background image
   */
  bgImage: string;
  /**
   * Slide Title
   */
  title: string;
  /**
   * Slide Subtitle
   */
  subTitle?: string;
  /**
   * Illustration image
   */
  image: string;
  /**
   * Width illustration image
   *
   * @default 300
   */
  imageWidth?: number;
  /**
   * Callback handle click in the primary button
   */
  handleBtnPrimary: () => void;
  /**
   * Text button primary
   */
  textBtnPrimary: string;
  /**
   * Pirmary button dark color
   *
   * @default false
   */
  darkBtnPrimary?: boolean;
  /**
   * Callback handle click in the secondary button
   */
  handleBtnSecondary?: () => void;
  /**
   * Text button secondary
   */
  textBtnSecondary?: string;
};

export const WelcomeSlide: React.FC<ComponentProps> = ({
  bgImage,
  title,
  subTitle,
  image,
  imageWidth = 300,
  darkBtnPrimary = false,
  handleBtnPrimary,
  textBtnPrimary,
  textBtnSecondary,
  handleBtnSecondary,
}) => (
  <Container
    className="animate__animated animate__fadeIn"
    sx={{
      backgroundImage: `url('${bgImage}')`,
    }}
  >
    <Content>
      <img
        src={image}
        alt={title}
        width={`${imageWidth}px`}
        className="animate__animated animate__bounceIn"
      />
      <Title variant="h1">{title}</Title>
      {subTitle && <SubTitle variant="subtitle1">{subTitle}</SubTitle>}
    </Content>
    <BtnContainer>
      <Button
        onClick={handleBtnPrimary}
        color={darkBtnPrimary ? "secondary" : "primary"}
        variant="contained"
        fullWidth
      >
        {textBtnPrimary}
      </Button>
      {textBtnSecondary && handleBtnSecondary && (
        <Button onClick={handleBtnSecondary} fullWidth>
          {textBtnSecondary}
        </Button>
      )}
    </BtnContainer>
  </Container>
);
