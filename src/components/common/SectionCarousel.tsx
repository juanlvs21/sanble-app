import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { useMediaQuery } from "react-responsive";

import { Carousel } from "@/components/common/Carousel";

const Title = styled(Typography)({
  fontSize: 20,
  fontWeight: 600,
  marginLeft: 20,
  marginBottom: 10,
});

export type ComponentProps = {
  /**
   * Title section
   */
  title: string;
  /**
   * items carousel
   */
  items: React.ReactElement[];
  /**
   * skeleton carousel
   */
  renderSkeleton?: () => JSX.Element;
  /**
   * Loading (show array skeleton carusel)
   *
   * @default false
   */
  loading?: boolean;
};

export const SectionCarousel: React.FC<ComponentProps> = ({
  title,
  items,
  renderSkeleton,
  loading = false,
}) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <section>
      <Title>{title}</Title>
      <Carousel
        items={
          loading && renderSkeleton ? [1, 2, 3].map(renderSkeleton) : items
        }
        disableButtonsControls={!isDesktop}
        disableDotsControls={isDesktop}
        autoPlayInterval={5000}
        autoPlay
        infinite
      />
    </section>
  );
};
