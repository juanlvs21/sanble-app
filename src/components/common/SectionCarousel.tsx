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
  items: any[];
};

export const SectionCarousel: React.FC<ComponentProps> = ({ title, items }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <section>
      <Title>{title}</Title>
      <Carousel
        items={items}
        disableButtonsControls={!isDesktop}
        disableDotsControls={isDesktop}
        autoPlayInterval={5000}
        autoPlay
        infinite
      />
    </section>
  );
};
