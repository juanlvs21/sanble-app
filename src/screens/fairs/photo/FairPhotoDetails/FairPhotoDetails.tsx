import {
  IonButton,
  IonButtons,
  IonContent,
  IonModal,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { HeaderModal } from "@/components/common/HeaderModal";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { TopBar } from "@/components/common/TopBar";
import { PhotoDescription } from "@/components/modules/photo/PhotoDescription";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";
import { useModalGoBack } from "@/hooks/useModalGoBack";
import { useUser } from "@/hooks/useUser";
import styles from "./FairPhotoDetails.module.css";

const MODAL_PHOTO_DESCRIPTION_ID = "photo-description-open-modal";

type TRouteParams = { fairID: string; photoID: string };

export const FairPhotoDetails = () => {
  const navigate = useNavigate();
  const [present] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const { fairID, photoID } = useParams<TRouteParams>();
  const { state } = useLocation();
  const finalFairID = fairID || state?.fairID || "";
  const finalPhotoID = photoID || state?.photoID || "";

  const {
    modalRef,
    photograph,
    ownerID,
    isLoading,
    isSubmit,
    isChangingPhoto,
    handleUpdatePhoto,
    handleGetPhoto,
  } = useFairPhoto(finalFairID);
  const { handleDeletePhoto, isDeletingPhoto } = useFairPhoto(finalFairID);
  const { user } = useUser();
  const [showDescription, setShowDescription] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleGetPhoto(finalPhotoID);
  }, []);

  const handleActions = () => {
    present({
      header: "Acciones",
      buttons: [
        {
          text: "Editar Fotografía",
          cssClass: "",
          handler: () => modalRef.current?.present(),
        },
        {
          text: "Eliminar Fotografía",
          cssClass: "danger-color",
          handler: () =>
            presentAlert({
              header:
                "¿Estás seguro de eliminar permanentemente esta fotografía?",
              buttons: [
                {
                  text: "Cancelar",
                  role: "cancel",
                },
                {
                  text: "Eliminar",
                  role: "confirm",
                  handler: () =>
                    handleDeletePhoto(photograph?.id || "", () => {
                      navigate(`/app/ferias/${finalFairID}`, {
                        state: {
                          fairID: finalFairID,
                        },
                        replace: true,
                      });
                    }),
                },
              ],
            }),
        },
        {
          text: "Cancelar",
          cssClass: "danger-color",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  const handleToggleShowDescription = () =>
    setShowDescription((state) => !state);

  const handleDismiss = () => modalRef.current?.dismiss();

  useModalGoBack(isOpen, handleDismiss);

  return (
    <>
      <TopBar
        title="Fotografía"
        start={
          <Button
            onClick={() =>
              finalFairID
                ? navigate(`/app/ferias/${finalFairID}`, {
                    state: { fairID: finalFairID },
                    replace: true,
                  })
                : navigate("/app/ferias", { replace: true })
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
                onClick={handleActions}
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
        isLoading={isLoading || isChangingPhoto || isDeletingPhoto}
        classNameContainer="animate__animated animate__screenInUp "
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
          <HeaderModal>
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
          </HeaderModal>
          <IonContent>
            <PhotoForm
              handleSave={handleUpdatePhoto}
              className={styles.photoEditForm}
              photo={photograph}
            />
          </IonContent>

          <SpinnerFullScreen
            show={isLoading || isSubmit || isDeletingPhoto}
            className={styles.photoEditFormSpinner}
          />
        </IonModal>
      )}
    </>
  );
};
