import { IonSlide, IonSlides } from "@ionic/react";
import { useMemo } from "react";

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
   * Default slides per view
   *
   * @default 1.1
   */
  slidesPerView?: number;
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

export const Carousel = ({
  title,
  items,
  isLoading,
  skeletonProps,
  className = "",
  classNameItem = "",
  slidesPerView = 1.1,
  breakpoints = {
    375: { slidesPerView: 1.2 },
    425: { slidesPerView: 1.3 },
    500: { slidesPerView: 1.8 },
    630: { slidesPerView: 2.4 },
    768: { slidesPerView: 2.8 },
    991: { slidesPerView: 3.1 },
    1600: { slidesPerView: 3.7 },
  },
}: ComponentProps) => {
  const slideOpts = useMemo(
    () => ({
      slidesPerView,
      breakpoints,

      initialSlide: 0,
      speed: 400,
      spaceBetween: 0,
    }),
    []
  );

  return (
    <section className={`${className} animate__animated animate__fadeIn`}>
      {title && <h2 className={styles.carouselTitle}>{title}</h2>}

      {isLoading ? (
        <Skeleton {...skeletonProps} />
      ) : (
        <IonSlides options={slideOpts}>
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
