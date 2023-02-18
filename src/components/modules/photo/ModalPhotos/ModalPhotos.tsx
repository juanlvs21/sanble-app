import {
  IonButtons,
  IonContent,
  IonHeader,
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
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { PhotoDescription } from "@/components/modules/photo/PhotoDescription";
import { TPhotograph } from "@/types/TPhotograph";
import styles from "./ModalPhotos.module.css";

export type ComponentProps = {
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
    id: string,
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
  const modalRef = useRef<HTMLIonModalElement>(null);
  const [showDescription, setShowDescription] = useState(true);
  const [activeID, setActiveID] = useState("");

  const slideOpts = useMemo(
    () => ({
      slidesPerView,
      initialSlide: 0,
      speed: 400,
      spaceBetween: 0,
    }),
    []
  );

  const handleDismiss = () => modalRef.current?.dismiss();

  const handleToggleShowDescription = () => {
    setShowDescription((state) => !state);
  };

  const handleModalWillPresent = () => {
    setShowDescription(true);

    if (photographs.length) {
      setActiveID(photographs[0].id);
    }
  };

  const handleSlideDidChange = async (ev: any) => {
    ev.target.getActiveIndex().then((index: number) => {
      setActiveID(photographs[index].id);
    });
  };

  return (
    <IonModal
      ref={modalRef}
      trigger={trigger}
      className={`${styles.photoModal} ${className}`}
      onWillPresent={handleModalWillPresent}
    >
      <SpinnerFullScreen
        show={Boolean(isLoading)}
        borderRadius
        className={styles.photoModalSpinner}
      />
      <IonHeader>
        <IonToolbar>
          {handleAction && (
            <IonButtons slot="start">
              <Button
                onClick={() => handleAction(activeID, handleDismiss)}
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
      </IonHeader>
      <IonContent>
        {photographs.length && !isLoading && (
          <IonSlides
            options={slideOpts}
            className={`${styles.photoContainer} animate__animated animate__fadeIn`}
            onIonSlideWillChange={handleSlideDidChange}
          >
            {photographs.map((photo, i) => (
              <IonSlide key={i} className={classNameItem}>
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
        {!photographs.length && !isLoading && (
          <EmptyAlert
            message={`No hay fotografías publicadas`}
            className="animate__animated animate__fadeIn"
          />
        )}
      </IonContent>
    </IonModal>
  );
};
