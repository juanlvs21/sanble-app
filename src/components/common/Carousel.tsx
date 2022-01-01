import React, {useRef} from 'react';
import SnapCarousel from 'react-native-snap-carousel';

import {width} from '../../constants/Layout';
import {TCarouselItem} from '../../types/carousel';

type ComponentProps = {
  /**
   * items carousel
   */
  items: any[];
  /**
   * Render items function
   */
  renderItem: (data: TCarouselItem<any>) => React.ReactElement;
  /**
   * Loading (show array skeleton carusel)
   *
   * @default false
   */
  loading?: boolean;
  /**
   * Width slider carousel
   */
  sliderWidth?: number;
  /**
   * Width item carousel
   */
  itemWidth?: number;
};

export const Carousel: React.FC<ComponentProps> = ({
  items,
  renderItem,
  sliderWidth = width,
  itemWidth = width,
}) => {
  const carouselRef = useRef(null);

  return (
    <SnapCarousel
      layout={'default'}
      ref={carouselRef}
      data={items}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
    />
  );
};
