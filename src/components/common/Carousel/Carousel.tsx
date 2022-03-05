import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "@ionic/react/css/ionic-swiper.css";

import styles from "./Carousel.module.css";

type ComponentProps = {
  /**
   * Data
   */
  data: any[];
  /**
   * Unique primary key name
   */
  keyName: string;
  /**
   * Card Element
   */
  card: (data: any, loading?: boolean) => React.ReactElement;
  /**
   * Loading carousel
   *
   * @default false
   */
  loading?: boolean;
};

export const Carousel: React.FC<ComponentProps> = ({
  data,
  keyName,
  card,
  loading = false,
}) => (
  <Swiper
    className={styles.carousel}
    modules={[Pagination]}
    speed={400}
    initialSlide={0}
    slidesPerView={1.5}
    pagination
    centeredSlides
  >
    {loading
      ? [1, 2, 3].map((i) => (
          <SwiperSlide key={i}>{card(undefined, loading)}</SwiperSlide>
        ))
      : data.map((dat) => (
          <SwiperSlide key={dat[keyName]}>{card(dat, loading)}</SwiperSlide>
        ))}

    {}
  </Swiper>
);
