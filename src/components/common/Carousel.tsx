import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AliceCarousel, { Props } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Container = styled("div")(({ theme }) => ({
  "& .alice-carousel": {
    textAlign: "center",
    "& .alice-carousel__prev-btn": {
      width: 45,
    },
    "& .alice-carousel__next-btn": {
      width: 45,
    },
    "& .alice-carousel__dots": {
      marginTop: 10,
    },
    "& .alice-carousel__dots-item:not(.__custom).__active": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const ButtonArrow = styled(Button)({
  minWidth: 30,
  height: 30,
});

export type ComponentProps = Props;

const renderNextBtnDefault = ({ isDisabled }: { isDisabled: boolean }) => (
  <ButtonArrow variant="text" disabled={isDisabled}>
    <FiChevronRight size={20} />
  </ButtonArrow>
);

const renderPrevBtnDefault = ({ isDisabled }: { isDisabled: boolean }) => (
  <ButtonArrow variant="text" disabled={isDisabled}>
    <FiChevronLeft size={20} />
  </ButtonArrow>
);

export const Carousel: React.FC<ComponentProps> = ({
  renderNextButton = renderNextBtnDefault,
  renderPrevButton = renderPrevBtnDefault,
  ...props
}) => (
  <Container>
    <AliceCarousel
      {...props}
      renderNextButton={renderNextButton}
      renderPrevButton={renderPrevButton}
      responsive={{
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        1024: {
          items: 3,
        },
        1440: {
          items: 4,
        },
      }}
    />
  </Container>
);
