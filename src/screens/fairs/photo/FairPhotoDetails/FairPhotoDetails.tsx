import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { TopBar } from "@/components/common/TopBar";
import { PhotoDescription } from "@/components/modules/photo/PhotoDescription";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";
import styles from "./FairPhotoDetails.module.css";
import { useUser } from "@/hooks/useUser";

const MODAL_PHOTO_DESCRIPTION_ID = "photo-description-open-modal";

export const FairPhotoDetails = () => {
  const { fairID, photoID } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLIonModalElement>(null);
  const { details, handleGetPhoto, handleUpdatePhoto, isLoading, isSubmit } =
    useFairPhoto(fairID || "");
  const { user } = useUser();
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    handleGetPhoto(photoID || "");
  }, []);

  const handleToggleShowDescription = () => {
    setShowDescription((state) => !state);
  };

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
          user?.uid === details?.ownerID ? (
            <Button
              isLoading={isLoading}
              spinnerColor="primary"
              id={MODAL_PHOTO_DESCRIPTION_ID}
            >
              <FiEdit2 size={24} />
            </Button>
          ) : undefined
        }
        titleSize={24}
        sticky
        stickyNoScroll
      />

      <PhotoDescription
        photo={details?.photograph}
        isCoverText="Fotografía de Perfil"
        showDescription={showDescription}
        onClick={handleToggleShowDescription}
        isLoading={isLoading}
      />

      <IonModal
        ref={modalRef}
        trigger={MODAL_PHOTO_DESCRIPTION_ID}
        className={styles.photoEditModal}
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
            photo={details?.photograph}
            isLoading={isSubmit}
          />
        </IonContent>
      </IonModal>
    </>
  );
};
