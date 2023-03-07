import {
  IonButtons,
  IonContent,
  IonModal,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useMemo, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";

import { Button } from "@/components/common/buttons/Button";
import { EmptyAlert } from "@/components/common/EmptyAlert";
import { HeaderModal } from "@/components/common/HeaderModal";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { PhotoDescription } from "@/components/modules/photo/PhotoDescription";
import { useModalGoBack } from "@/hooks/useModalGoBack";
import { TPhotograph } from "@/types/TPhotograph";
import styles from "./ModalPhotos.module.css";

export type ComponentProps = {
  /**
   * Modal photos ref
   */
  modalRef: React.RefObject<HTMLIonModalElement>;
  /**
   * Slides photos ref
   */
  slidesRef?: React.Ref<HTMLIonSlidesElement>;
  /**
   * photographs list
   */
  photographs: TPhotograph[];
  /**
   * Text that is displayed when the photo is isCover: true
   *
   * @default "Fotografía Destacada"
   */
  isCoverText?: string;
  /**
   * Trigger open modal
   */
  trigger?: string;
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
   * Callback for the action button. If this parameter is not sent, the button will not be show
   */
  handleAction?: (
    activePhoto: TPhotograph,
    handleDismiss?: () => Promise<boolean> | undefined
  ) => void;
  /**
   * Icon for the action button
   *
   * @default <FiMenu size={24} />
   */
  ActionIcon?: JSX.Element;
  /**
   * Component Loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
  /**
   * Custom className for content item component
   */
  classNameItem?: string;
};

export const ModalPhotos = ({
  modalRef,
  slidesRef,
  handleAction,
  photographs,
  trigger,
  isLoading,
  isCoverText = "Fotografía Destacada",
  ActionIcon = <FiMenu size={24} />,
  slidesPerView = 1,
  className = "",
  classNameItem = "",
}: ComponentProps) => {
  const [showDescription, setShowDescription] = useState(true);
  const [activePhoto, setActivePhoto] = useState<TPhotograph>();
  const [isOpen, setIsOpen] = useState(false);

  const slideOpts = useMemo(
    () => ({
      slidesPerView,
      initialSlide: 0,
      speed: 400,
      spaceBetween: 0,
    }),
    []
  );

  const handleDismiss = () => {
    if (modalRef) modalRef.current?.dismiss();
    return Promise.resolve(true);
  };

  const handleToggleShowDescription = () => {
    setShowDescription((state) => !state);
  };

  const handleModalWillPresent = () => {
    setShowDescription(true);
    setIsOpen(true);

    if (photographs.length) {
      setActivePhoto(photographs[0]);
    }
  };

  const handleSlideDidChange = async (ev: any) => {
    ev.target.getActiveIndex().then((index: number) => {
      setActivePhoto(photographs[index]);
    });
  };

  useModalGoBack(isOpen, handleDismiss);

  return (
    <IonModal
      ref={modalRef}
      trigger={trigger}
      className={`${styles.photoModal} ${className}`}
      onWillPresent={handleModalWillPresent}
      onWillDismiss={() => setIsOpen(false)}
    >
      <SpinnerFullScreen
        show={Boolean(isLoading)}
        borderRadius
        className={styles.photoModalSpinner}
      />
      <HeaderModal>
        <IonToolbar>
          {handleAction && (
            <IonButtons slot="start">
              <Button
                onClick={
                  activePhoto
                    ? () => handleAction(activePhoto, handleDismiss)
                    : undefined
                }
                fill="clear"
                color="medium"
              >
                {ActionIcon}
              </Button>
            </IonButtons>
          )}
          <IonButtons slot="end">
            <Button onClick={handleDismiss} fill="clear" color="medium">
              <AiOutlineClose size={24} />
            </Button>
          </IonButtons>
          <IonTitle>Fotografías</IonTitle>
        </IonToolbar>
      </HeaderModal>
      <IonContent>
        {Boolean(photographs.length) && !isLoading && (
          <IonSlides
            ref={slidesRef}
            options={slideOpts}
            className={`${styles.photoContainer} animate__animated animate__fadeIn`}
            onIonSlideWillChange={handleSlideDidChange}
          >
            {photographs.map((photo, i) => (
              <IonSlide
                key={i}
                className={`${classNameItem} ${styles.photoSlide}`}
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
    </IonModal>
  );
};
