import { useIonActionSheet, useIonAlert } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDocumentTitle } from "usehooks-ts";

import { Button } from "@/components/common/buttons/Button";
import { SpinnerFullScreen } from "@/components/common/loaders/SpinnerFullScreen";
import { ModalUpdate } from "@/components/modules/photo/ModalUpdate";
import { PhotoSlides } from "@/components/modules/photo/PhotoSlides";
import { getNavStateText } from "@/helpers/navigation";
import { useStandPhotoDelete } from "@/hooks/stands/photo/useStandPhotoDelete";
import { useStandPhotoUpdate } from "@/hooks/stands/photo/useStandPhotoUpdate";
import { useStandDetails } from "@/hooks/stands/useStandDetails";
import { useApp } from "@/hooks/useApp";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { useUser } from "@/hooks/useUser";
import { TPhotograph } from "@/types/TPhotograph";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./StandPhotoSlides.module.css";

type TRouteParams = { standID: string };

export const StandPhotoSlides = () => {
  const navigate = useNavigate();
  const [presentActions] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const { standID } = useParams<TRouteParams>();
  const { state } = useLocation();
  const { user } = useUser();
  const slidesRef = useRef<HTMLIonSlidesElement>(null);

  const finaStandID = standID || state?.standID || "";

  const { isCapacitor } = useApp();
  const { renderTopBarActionStart, renderTopBarActionEnd } = useTopBarMain();
  const { stand, isLoadingDetails, handleLoadAll, getIndexPhoto } =
    useStandDetails(finaStandID);
  const { handleDeletePhoto } = useStandPhotoDelete(finaStandID);
  const {
    modalRef: modalUpdateRef,
    photo: photoUpdate,
    handleUpdatePhoto,
    handleOpen: handleUpdateOpen,
    handleDismiss: handleUpdateDismiss,
    isUpdate,
  } = useStandPhotoUpdate(finaStandID, async (updateID?: string) => {
    await handleLoadAll();
    slidesRef.current?.slideTo(getIndexPhoto(updateID), 0);
  });
  const [photoShown, setPhotoShown] = useState(false);
  const [activePhoto, setActivePhoto] = useState<TPhotograph>();

  useDocumentTitle(
    `Fotografías de ${
      getNavStateText(standID, state?.standID, state?.standName) ||
      stand?.name ||
      "Stand"
    } 📷`
  );

  const handleAction = () => {
    const buttons = [
      {
        text: "Publicar Nueva Fotografía",
        cssClass: "",
        handler: () =>
          navigate(`${ERoutesName.STANDS_LIST}/${finaStandID}/fotos/nueva`),
      },
    ];

    if (stand?.photographs.length) {
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

  const handleGoDetailsStand = () => {
    navigate(`${ERoutesName.STANDS_LIST}/${finaStandID}`, {
      state: stand ? { standID: stand.id, standName: stand.name } : {},
    });
  };

  useEffect(() => {
    if (!isLoadingDetails && state?.photoActiveID && !photoShown) {
      slidesRef.current?.slideTo(getIndexPhoto(state?.photoActiveID), 0);
      setPhotoShown(true);
    }
  }, [isLoadingDetails, state]);

  useEffect(() => {
    if (stand && stand?.photographs.length && !activePhoto) {
      setActivePhoto(stand?.photographs[0]);
    }
  }, [stand]);

  return (
    <>
      {renderTopBarActionStart(
        <Button onClick={handleGoDetailsStand} fill="clear" color="medium">
          <IoIosArrowBack size={24} />
        </Button>
      )}

      {user?.uid === stand?.owner.id &&
        renderTopBarActionEnd(
          <Button onClick={handleAction} fill="clear" color="medium">
            <FiEdit size={24} />
          </Button>
        )}

      <PhotoSlides
        slidesRef={slidesRef}
        photographs={stand?.photographs || []}
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
