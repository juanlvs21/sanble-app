import { IonContent, IonSlide, IonSlides } from "@ionic/react";
import { useMemo, useState } from "react";

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
  slidesRef?: React.Ref<HTMLIonSlidesElement>;
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
   * @default 1.1
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

  const slideOpts = useMemo(
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

  const handleSlideDidChange = async (ev: any) => {
    ev.target.getActiveIndex().then((index: number) => {
      handleSetActivePhoto(photographs[index]);
    });
  };

  return (
    <IonContent className={`${className}`}>
      {Boolean(photographs.length) && !isLoading && (
        <IonSlides
          ref={slidesRef}
          options={slideOpts}
          className={`${styles.photoContainer} ${classNameSlides} animate__animated animate__fadeIn`}
          onIonSlideWillChange={handleSlideDidChange}
        >
          {photographs.map((photo, i) => (
            <IonSlide
              key={i}
              className={`${classNameSlide} ${styles.photoSlide}`}
            >
              <PhotoDescription
                photo={photo}
                isCoverText={isCoverText}
                showDescription={showDescription}
                onClick={handleToggleShowDescription}
              />
            </IonSlide>
          ))}
        </IonSlides>
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
