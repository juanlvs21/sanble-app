import {
  IonButtons,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { UseFormReset } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

import { Button } from "@/components/common/buttons/Button";
import { HeaderModal } from "@/components/common/HeaderModal";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { TPhotograph, TPhotographForm } from "@/types/TPhotograph";
import styles from "./ModalUpdate.module.css";
import { useModalGoBack } from "@/hooks/useModalGoBack";

export type ComponentProps = {
  /**
   * Modal Ref
   */
  modalRef: React.RefObject<HTMLIonModalElement>;
  /**
   * Previous information of the photo (In case of photo editing)
   */
  photo?: TPhotograph;
  /**
   * Handle save photo
   */
  handleSave: (
    values: TPhotographForm,
    reset: UseFormReset<TPhotographForm>
  ) => void | Promise<any>;
  /**
   * Handle close modal
   */
  handleDismiss: () => void;
  /**
   * Form Loading
   */
  isLoading?: boolean;
  /**
   * Custom className component
   */
  className?: string;
};

export const ModalUpdate = ({
  modalRef,
  photo,
  isLoading,
  handleSave,
  handleDismiss,
  className = "",
}: ComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useModalGoBack(isOpen, handleDismiss);

  return (
    <IonModal
      ref={modalRef}
      onWillPresent={() => setIsOpen(true)}
      onWillDismiss={() => setIsOpen(false)}
      className={`${className}`}
    >
      <HeaderModal>
        <IonToolbar>
          <IonButtons slot="end">
            <Button onClick={handleDismiss} fill="clear" color="medium">
              <AiOutlineClose size={24} />
            </Button>
          </IonButtons>
          <IonTitle>Fotografías</IonTitle>
        </IonToolbar>
      </HeaderModal>
      <IonContent>
        {photo && (
          <PhotoForm
            handleSave={handleSave}
            photo={photo}
            isLoading={isLoading}
            className={styles.updatePhotoForm}
          />
        )}
      </IonContent>
    </IonModal>
  );
};
