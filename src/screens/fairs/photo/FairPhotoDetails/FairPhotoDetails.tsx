import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { TopBar } from "@/components/common/TopBar";
import { PhotoDescription } from "@/components/modules/photo/PhotoDescription";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";
import { useModalGoBack } from "@/hooks/useModalGoBack";
import { useUser } from "@/hooks/useUser";
import styles from "./FairPhotoDetails.module.css";

const MODAL_PHOTO_DESCRIPTION_ID = "photo-description-open-modal";

export const FairPhotoDetails = () => {
  const { fairID, photoID } = useParams();
  const navigate = useNavigate();
  const {
    modalRef,
    photograph,
    ownerID,
    isLoading,
    isSubmit,
    isChangingPhoto,
    handleUpdatePhoto,
    handleGetPhoto,
  } = useFairPhoto(fairID || "");
  const { user } = useUser();
  const [showDescription, setShowDescription] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleGetPhoto(photoID || "");
  }, []);

  const handleToggleShowDescription = () => {
    setShowDescription((state) => !state);
  };

  const handleDismiss = () => modalRef.current?.dismiss();

  useModalGoBack(isOpen, handleDismiss);

  return (
    <>
      <TopBar
        title="Fotografía"
        start={
          <Button
            onClick={() =>
              fairID
                ? navigate(`/app/ferias/${fairID}`)
                : navigate("/app/ferias")
            }
          >
            <IoIosArrowBack size={24} />
          </Button>
        }
        end={
          <>
            {user?.uid === ownerID && (
              <Button
                isLoading={isLoading}
                spinnerColor="primary"
                id={MODAL_PHOTO_DESCRIPTION_ID}
                className="animate__animated animate__fadeIn"
              >
                <FiEdit2 size={24} />
              </Button>
            )}
          </>
        }
        titleSize={24}
        sticky
        stickyNoScroll
      />

      <PhotoDescription
        photo={photograph}
        isCoverText="Fotografía de Perfil"
        showDescription={showDescription}
        onClick={
          !isLoading && !isSubmit ? handleToggleShowDescription : undefined
        }
        isLoading={isLoading || isChangingPhoto}
        className="animate__animated animate__fadeIn"
      />

      {user?.uid === ownerID && (
        <IonModal
          ref={modalRef}
          trigger={MODAL_PHOTO_DESCRIPTION_ID}
          className={styles.photoEditModal}
          canDismiss={!isSubmit}
          onWillPresent={() => setIsOpen(true)}
          onWillDismiss={() => setIsOpen(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton
                  onClick={() => modalRef.current?.dismiss()}
                  fill="clear"
                  color="medium"
                >
                  <AiOutlineClose size={24} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <PhotoForm
              handleSave={handleUpdatePhoto}
              className={styles.photoEditForm}
              photo={photograph}
            />
          </IonContent>

          <SpinnerFullScreen
            show={isLoading || isSubmit}
            className={styles.photoEditFormSpinner}
          />
        </IonModal>
      )}
    </>
  );
};
