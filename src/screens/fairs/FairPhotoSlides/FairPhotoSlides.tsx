import { useIonActionSheet, useIonAlert } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { ModalUpdate } from "@/components/modules/photo/ModalUpdate";
import { PhotoSlides } from "@/components/modules/photo/PhotoSlides";
import { useFairPhotoDelete } from "@/hooks/fairs/photo/useFairPhotoDelete";
import { useFairPhotoUpdate } from "@/hooks/fairs/photo/useFairPhotoUpdate";
import { useFairDetails } from "@/hooks/fairs/useFairDetails";
import { useApp } from "@/hooks/useApp";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { useUser } from "@/hooks/useUser";
import { TPhotograph } from "@/types/TPhotograph";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./FairPhotoSlides.module.css";

type TRouteParams = { fairID: string };

export const FairPhotoSlides = () => {
  const navigate = useNavigate();
  const [presentActions] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const { fairID } = useParams<TRouteParams>();
  const { state } = useLocation();
  const { user } = useUser();
  const slidesRef = useRef<HTMLIonSlidesElement>(null);

  const finalFairID = fairID || state?.fairID || "";

  const { isCapacitor } = useApp();
  const { renderTopBarActionStart, renderTopBarActionEnd } = useTopBarMain();
  const { fair, isLoadingDetails, handleLoadAll, getIndexPhoto } =
    useFairDetails(finalFairID);
  const { handleDeletePhoto } = useFairPhotoDelete(finalFairID);
  const {
    modalRef: modalUpdateRef,
    photo: photoUpdate,
    handleUpdatePhoto,
    handleOpen: handleUpdateOpen,
    handleDismiss: handleUpdateDismiss,
    isUpdate,
  } = useFairPhotoUpdate(finalFairID, async (updateID?: string) => {
    await handleLoadAll();
    slidesRef.current?.slideTo(getIndexPhoto(updateID), 0);
  });
  const [photoShown, setPhotoShown] = useState(false);
  const [activePhoto, setActivePhoto] = useState<TPhotograph>();

  const handleAction = () => {
    const buttons = [
      {
        text: "Publicar Nueva Fotografía",
        cssClass: "",
        handler: () =>
          navigate(`${ERoutesName.FAIRS_LIST}/${finalFairID}/foto`),
      },
    ];

    if (fair?.photographs.length) {
      buttons.push(
        {
          text: "Editar Fotografía",
          cssClass: "",
          handler: () => {
            if (activePhoto) {
              handleUpdateOpen(activePhoto);
            }
          },
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
                  handler: () => {
                    if (activePhoto) {
                      handleDeletePhoto(activePhoto.id, async () => {
                        await handleLoadAll();
                      });
                    }
                  },
                },
              ],
            }),
        }
      );
    }

    presentActions({
      header: "Acciones",
      buttons: [
        ...buttons,
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

  const handleGoDetailsFair = () => {
    navigate(`${ERoutesName.FAIRS_LIST}/${finalFairID}`, {
      state: fair ? { fairID: fair.id, fairName: fair.name } : {},
    });
  };

  useEffect(() => {
    if (!isLoadingDetails && state?.photoActiveID && !photoShown) {
      slidesRef.current?.slideTo(getIndexPhoto(state?.photoActiveID), 0);
      setPhotoShown(true);
    }
  }, [isLoadingDetails, state]);

  useEffect(() => {
    if (fair && fair?.photographs.length && !activePhoto) {
      setActivePhoto(fair?.photographs[0]);
    }
  }, [fair]);

  return (
    <>
      {renderTopBarActionStart(
        <Button onClick={handleGoDetailsFair} fill="clear" color="medium">
          <IoIosArrowBack size={24} />
        </Button>
      )}

      {user?.uid === fair?.owner.id &&
        renderTopBarActionEnd(
          <Button onClick={handleAction} fill="clear" color="medium">
            <FiEdit size={24} />
          </Button>
        )}

      <PhotoSlides
        slidesRef={slidesRef}
        photographs={fair?.photographs || []}
        handleSetActivePhoto={(photo) => setActivePhoto(photo)}
        isLoading={isLoadingDetails}
        isCoverText="Fotografía de Perfil"
        className="animate__animated animate__screenInUp"
        classNameSlides={`${styles.photoSlides} ${
          isCapacitor ? styles.isCapacitor : ""
        }`}
      />

      <ModalUpdate
        modalRef={modalUpdateRef}
        handleSave={handleUpdatePhoto}
        isLoading={isUpdate}
        photo={photoUpdate}
        handleDismiss={handleUpdateDismiss}
      />

      <SpinnerFullScreen show={Boolean(isLoadingDetails)} />
    </>
  );
};
