import { IonSlide, IonSlides } from "@ionic/react";

import {
  ComponentProps as SkeletonProps,
  Skeleton,
} from "@/components/common/Skeleton";

import styles from "./Carousel.module.css";

export type ComponentProps = {
  /**
   * Title
   */
  title?: string;
  /**
   * List of items to render on the slides
   */
  items: React.ReactElement[];
  /**
   * Data Loading
   */
  isLoading?: boolean;
  /**
   * Custom className for content component
   */
  className?: string;
  /**
   * Skeleton props
   */
  skeletonProps?: SkeletonProps;
};

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 1.2,
  spaceBetween: 0,

  breakpoints: {
    375: { slidesPerView: 1.5 }, // >= 375
    470: { slidesPerView: 1.8 }, // >= 470
    520: { slidesPerView: 2.2 }, // >= 520
    650: { slidesPerView: 2.6 }, // >= 650
    768: { slidesPerView: 3.1 }, // >= 768
    1024: { slidesPerView: 3.8 }, // >= 1024
    1336: { slidesPerView: 4.2 }, // >= 1336
    1440: { slidesPerView: 5.5 }, // >= 1440
  },
};

export const Carousel: React.FC<ComponentProps> = ({
  title,
  items,
  isLoading,
  skeletonProps,
  className = "",
}) => {
  return (
    <section className={`${className} animate__animated animate__fadeIn`}>
      {title && <h2 className={styles.carouselTitle}>{title}</h2>}

      {isLoading ? (
        <Skeleton {...skeletonProps} />
      ) : (
        <IonSlides
          options={slideOpts}
          className={styles.slidesWelcomeContainer}
        >
          {items.map((item, i) => (
            <IonSlide key={i}>{item}</IonSlide>
          ))}
        </IonSlides>
      )}
    </section>
  );
};
