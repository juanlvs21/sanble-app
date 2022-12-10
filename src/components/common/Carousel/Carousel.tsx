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
   * Object of responsive
   */
  breakpoints?: Record<string, any>;
  /**
   * Data Loading
   */
  isLoading?: boolean;
  /**
   * Custom className for content component
   */
  className?: string;
  /**
   * Custom className for content item component
   */
  classNameItem?: string;
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
    320: { slidesPerView: 1.1 }, // >= 320
    375: { slidesPerView: 1.5 }, // >= 375
    500: { slidesPerView: 1.8 }, // >= 500
    630: { slidesPerView: 2.4 }, // >= 630
    768: { slidesPerView: 2.8 }, // >= 768
    991: { slidesPerView: 3.1 }, // >= 991
    1600: { slidesPerView: 3.7 }, // >= 1600
  },
};

export const Carousel: React.FC<ComponentProps> = ({
  title,
  items,
  isLoading,
  skeletonProps,
  breakpoints,
  className = "",
  classNameItem = "",
}) => {
  return (
    <section className={`${className} animate__animated animate__fadeIn`}>
      {title && <h2 className={styles.carouselTitle}>{title}</h2>}

      {isLoading ? (
        <Skeleton {...skeletonProps} />
      ) : (
        <IonSlides
          options={breakpoints ? { ...slideOpts, breakpoints } : slideOpts}
        >
          {items.map((item, i) => (
            <IonSlide key={i}>
              <div className={`${styles.slidesItem} ${classNameItem}`}>
                {item}
              </div>
            </IonSlide>
          ))}
        </IonSlides>
      )}
    </section>
  );
};
