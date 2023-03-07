import {
  IonButton,
  IonButtons,
  IonContent,
  IonModal,
  IonToolbar,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { HeaderModal } from "@/components/common/HeaderModal";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { PhotoDescription } from "@/components/modules/photo/PhotoDescription";
import { PhotoForm } from "@/components/modules/photo/PhotoForm";
import { useFairPhotoDelete } from "@/hooks/fairs/photo/useFairPhotoDelete";
import { useFairPhotoDetails } from "@/hooks/fairs/photo/useFairPhotoDetails";
import { useFairPhotoUpdate } from "@/hooks/fairs/photo/useFairPhotoUpdate";
import { useApp } from "@/hooks/useApp";
import { useModalGoBack } from "@/hooks/useModalGoBack";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { useUser } from "@/hooks/useUser";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./FairPhotoDetails.module.css";
import { ModalUpdate } from "@/components/modules/photo/ModalUpdate";

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
  const { isCapacitor } = useApp();
  const { renderTopBarActionStart, renderTopBarActionEnd } = useTopBarMain();
  const { handleDeletePhoto } = useFairPhotoDelete(finalFairID);
  const { user } = useUser();
  const { photograph, ownerID, isLoading, handleLoad } = useFairPhotoDetails(
    finalFairID,
    finalPhotoID
  );
  const {
    modalRef: modalUpdateRef,
    photo: photoUpdate,
    handleUpdatePhoto,
    handleOpen: handleUpdateOpen,
    handleDismiss: handleUpdateDismiss,
    isUpdate,
  } = useFairPhotoUpdate(finalFairID, () => handleLoad());
  const [showDescription, setShowDescription] = useState(true);

  const handleActions = () => {
    present({
      header: "Acciones",
      buttons: [
        {
          text: "Editar Fotografía",
          cssClass: "",
          handler: photograph ? () => handleUpdateOpen(photograph) : undefined,
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
                      navigate(`${ERoutesName.FAIRS_LIST}/${finalFairID}`, {
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

  return (
    <>
      {renderTopBarActionStart(
        <Button
          onClick={() =>
            finalFairID
              ? navigate(`${ERoutesName.FAIRS_LIST}/${finalFairID}`, {
                  state: { fairID: finalFairID },
                  replace: true,
                })
              : navigate(ERoutesName.FAIRS_LIST, { replace: true })
          }
        >
          <IoIosArrowBack size={24} />
        </Button>
      )}

      {user?.uid === ownerID &&
        renderTopBarActionEnd(
          <Button
            isLoading={isLoading}
            spinnerColor="primary"
            onClick={handleActions}
            className="animate__animated animate__fadeIn"
          >
            <FiEdit2 size={24} />
          </Button>
        )}

      <section
        className={`${styles.photoSection} ${
          isCapacitor ? styles.isCapacitor : ""
        } animate__animated animate__screenInUp`}
      >
        <PhotoDescription
          photo={photograph}
          isCoverText="Fotografía de Perfil"
          showDescription={showDescription}
          onClick={!isLoading ? handleToggleShowDescription : undefined}
          isLoading={!photograph || isLoading || isUpdate}
        />
      </section>

      {user?.uid === ownerID && (
        <ModalUpdate
          modalRef={modalUpdateRef}
          handleSave={handleUpdatePhoto}
          isLoading={isUpdate}
          photo={photoUpdate}
          handleDismiss={handleUpdateDismiss}
        />
      )}
    </>
  );
};
