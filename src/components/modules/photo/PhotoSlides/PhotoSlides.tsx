import { IonContent } from "@ionic/react";
import { useMemo, useState, Ref } from "react";
import { Swiper, SwiperSlide, SwiperProps, SwiperRef } from "swiper/react";

import "swiper/css";
import "@ionic/react/css/ionic-swiper.css";

import { EmptyAlert } from "@/components/common/EmptyAlert";
import { PhotoDescription } from "@/components/modules/photo/PhotoDescription";
import { TPhotograph } from "@/types/TPhotograph";
import styles from "./PhotoSlides.module.css";

export type ComponentProps = {
  /**
   * photographs list
   */
  photographs: TPhotograph[];
  /**
   * Slides photos ref
   */
  slidesRef?: Ref<SwiperRef>;
  /**
   * Function to set active photo
   */
  handleSetActivePhoto?: (activePhoto: TPhotograph) => void;
  /**
   * Text that is displayed when the photo is isCover: true
   *
   * @default "Fotografía Destacada"
   */
  isCoverText?: string;
  /**
   * Default slides per view
   *
   * @default 1
   */
  slidesPerView?: number;
  /**
   * Component Loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
  /**
   * Custom className component
   */
  classNameSlides?: string;
  /**
   * Custom className for content item component
   */
  classNameSlide?: string;
};

export const PhotoSlides = ({
  slidesRef,
  photographs,
  isLoading,
  handleSetActivePhoto = () => undefined,
  isCoverText = "Fotografía Destacada",
  slidesPerView = 1,
  className = "",
  classNameSlide = "",
  classNameSlides = "",
}: ComponentProps) => {
  const [showDescription, setShowDescription] = useState(true);

  const slideOpts: SwiperProps = useMemo(
    () => ({
      slidesPerView,
      initialSlide: 0,
      speed: 400,
      spaceBetween: 0,
    }),
    []
  );

  const handleToggleShowDescription = () => {
    setShowDescription((state) => !state);
  };

  const onActiveChange = async (event: any) => {
    handleSetActivePhoto(photographs[event.activeIndex]);
  };

  return (
    <IonContent className={`${className}`}>
      {Boolean(photographs.length) && !isLoading && (
        <Swiper
          ref={slidesRef}
          className={`${styles.photoContainer} ${classNameSlides} animate__animated animate__fadeIn`}
          onActiveIndexChange={onActiveChange}
          {...slideOpts}
        >
          {photographs.map((photo, i) => (
            <SwiperSlide
              key={i}
              className={`${classNameSlide} ${styles.photoSlide}`}
            >
              <PhotoDescription
                photo={photo}
                isCoverText={isCoverText}
                showDescription={showDescription}
                onClick={handleToggleShowDescription}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!Boolean(photographs.length) && !isLoading && (
        <EmptyAlert
          message={`No hay fotografías publicadas`}
          className="animate__animated animate__fadeIn"
        />
      )}
    </IonContent>
  );
};
