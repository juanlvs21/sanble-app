import {
  IonFab,
  IonFabButton,
  IonFabList,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit2, FiMapPin } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoIosArrowUp, IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";
import { TiStar } from "react-icons/ti";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
import { FairModalMap } from "@/components/modules/fairs/FairModalMap";
import { FairModalStands } from "@/components/modules/fairs/FairModalStands";
import { InfoModal } from "@/components/modules/info/InfoModal";
import { ModalPhotos } from "@/components/modules/photo/ModalPhotos";
import { ReviewForm } from "@/components/modules/reviews/ReviewForm";
import { ReviewsList } from "@/components/modules/reviews/ReviewsList";
import { fairType } from "@/helpers/fairs";
import { getNavStateText } from "@/helpers/navigation";
import { useFairDetails } from "@/hooks/fairs/useFairDetails";
import { useFairStands } from "@/hooks/fairs/useFairStands";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";
import styles from "./FairDetails.module.css";
import { useFairPhoto } from "@/hooks/fairs/useFairPhoto";

const MODAL_INFO_ID = "fair-info-open-modal";
const MODAL_MAP_ID = "fair-map-open-modal";
const MODAL_STANDS_ID = "fair-stands-open-modal";
const MODAL_PHOTOS_ID = "fair-photos-open-modal";

export const FairDetails = () => {
  const navigate = useNavigate();
  const [present] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const { fairID } = useParams();
  const { state } = useLocation();
  const { user, loadingSetFav, handleSetFavoriteFair } = useUser();
  const {
    fair,
    review,
    reviews,
    isLoading,
    isSaving,
    isLoadingReviews,
    handleLoadAll,
    handleSaveReview,
    handleRefreshReviews,
    handleInfiniteReviews,
  } = useFairDetails(fairID || "");
  const {
    stands,
    isLoading: isLoadingStands,
    handleLoad: handleRefreshStands,
    handleInfinite: handleInfiniteStands,
  } = useFairStands(fairID || "");
  const {
    handleDeletePhoto,
    isLoading: isLoadingPhoto,
    isDeletingPhoto,
  } = useFairPhoto(fairID || "");
  const [openCover, setOpenCover] = useState(false);

  useDocumentTitle(
    `${
      getNavStateText(fairID, state?.fairID, state?.fairName) ||
      fair?.name ||
      "Feria"
    } 🛍️`
  );

  const handleGalleryAction = (
    photoID: string,
    handleDismiss?: () => Promise<boolean> | undefined
  ) => {
    const navPhoto = (path: string) => {
      if (handleDismiss) handleDismiss();
      setTimeout(() => navigate(path), 200);
    };

    const buttons = [
      {
        text: "Publicar Nueva Fotografía",
        cssClass: "",
        handler: () => navPhoto(`/app/ferias/${fairID}/foto`),
      },
    ];

    if (fair?.photographs.length) {
      buttons.push(
        {
          text: "Editar Fotografía",
          cssClass: "",
          handler: () => navPhoto(`/app/ferias/${fairID}/foto/${photoID}`),
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
                    handleDeletePhoto(photoID, () => {
                      if (handleDismiss) handleDismiss();
                      handleLoadAll();
                    }),
                },
              ],
            }),
        }
      );
    }

    present({
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

  return (
    <>
      <TopBar
        title="Detalles"
        startGoBack
        startGoBackUrl={state?.goBackUrl || "/app/ferias"}
        end={
          <ButtonFav
            isLoading={loadingSetFav}
            color="light"
            spinnerColor="dark"
            isActive={user?.favoriteFairs.includes(fair?.id || "")}
            onClick={() => (fair ? handleSetFavoriteFair(fair.id) : undefined)}
          />
        }
        className={`${openCover ? styles.fairTopBarCoverOpen : ""}`}
        titleSize={24}
        titleLight
        sticky
      />

      <div
        className={`${styles.fairCoverBg} ${
          openCover ? styles.fairCoverOpen : ""
        }`}
      />

      <Fetcher
        handleRefresh={handleRefreshReviews}
        handleInfiniteScroll={handleInfiniteReviews}
        refreshSpinnerColor="medium"
        classNameSection={`${styles.fairFetcherSection} ${
          openCover ? styles.fairCoverOpen : ""
        }`}
        classNameContent={`${styles.fairFetcherContent} ${
          openCover ? styles.fairCoverOpen : ""
        }`}
        classNameInfinite={styles.fairFetcherInfinite}
      >
        <div className={styles.fairCoverContainer}>
          {openCover && (
            <Button
              fill="solid"
              color="light"
              size="small"
              onClick={() => setOpenCover(false)}
              className={`${styles.fairCoverBtnClose} animate__animated animate__zoomIn`}
            >
              <IoIosCloseCircleOutline size={24} />
            </Button>
          )}

          <ImageExtended
            src={fair?.coverUrl}
            alt={fair?.name}
            isLoading={!fair || isLoading || isDeletingPhoto}
            onClick={() => setOpenCover((state) => !state)}
            className={`${openCover ? styles.fairCoverOpen : ""}`}
            classNamePicture={`${styles.fairCover} ${
              openCover ? styles.fairCoverOpen : ""
            }`}
            skeletonProps={{
              className: styles.fairSkeleton,
            }}
          />
        </div>
        <section
          className={`${styles.fairContent} ${
            openCover ? styles.fairCoverOpen : ""
          }`}
        >
          <div className={styles.fairNameContainer}>
            {getNavStateText(fairID, state?.fairID, state?.fairName) ? (
              <h1>{getNavStateText(fairID, state?.fairID, state?.fairName)}</h1>
            ) : (
              <>
                {isLoading ? (
                  <Skeleton width="100%" height={35} />
                ) : (
                  <h1>{fair?.name}</h1>
                )}
              </>
            )}
            <div className={styles.fairNameStars}>
              {!isLoading && (
                <>
                  <span
                    className={`${styles.fairNameStarsIcon} animate__animated animate__fadeIn`}
                  >
                    <TiStar size={25} />
                  </span>
                  <span className="animate__animated animate__fadeIn">
                    {`${fair?.stars || 0}`}
                  </span>
                </>
              )}
            </div>
          </div>
          <div>
            {isLoading ? (
              <Skeleton
                width="100%"
                height={20}
                style={{ margin: "5px 0px" }}
              />
            ) : (
              <h6 className={styles.fairType}>
                {fair ? fairType[`${fair?.type}_long`] : ""}
              </h6>
            )}
            <section className={styles.fairDescription}>
              {isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton
                      key={i}
                      width="100%"
                      height={20}
                      style={{ margin: i === 0 ? "20px 0px 5px" : "5px 0px" }}
                    />
                  ))
              ) : (
                <p>{fair?.description}</p>
              )}
            </section>

            <section className={styles.fairInfo}>
              <div className={styles.fairInfoCard} id={MODAL_INFO_ID}>
                <AiOutlineInfoCircle size={35} />
                <h5>Información de Contacto</h5>
              </div>
              <div className={styles.fairInfoCard} id={MODAL_MAP_ID}>
                <FiMapPin size={35} />
                <h5>Localización en Mapa</h5>
              </div>
              <div className={styles.fairInfoCard} id={MODAL_PHOTOS_ID}>
                <HiOutlinePhotograph size={35} />
                <h5>Fotos</h5>
              </div>
              <div className={styles.fairInfoCard} id={MODAL_STANDS_ID}>
                <MdOutlineStorefront size={35} />
                <h5>Stands </h5>
              </div>
            </section>

            <section
              className={`${styles.fairReviewsContainer} animate__animated animate__fadeIn`}
            >
              <h3>Califica esta Feria</h3>
              <p>Comparte tu opinión con otros usuarios</p>

              <ReviewForm
                review={review}
                handleSave={handleSaveReview}
                isLoading={isSaving || isLoading}
              />
              <ReviewsList
                reviews={reviews}
                isLoading={isLoadingReviews && !reviews?.length}
                className={styles.fairReviewsList}
              />
            </section>
          </div>
        </section>
      </Fetcher>

      {user?.uid === fair?.owner.id && (
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className={`${styles.fairFloatBtn} ${
            openCover ? styles.fairCoverOpen : ""
          } animate__animated animate__fadeIn`}
        >
          <IonFabButton color="secondary">
            <IoIosArrowUp size={28} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="secondary">
              <FiEdit2 size={22} />
            </IonFabButton>
            <IonFabButton color="secondary">
              <MdOutlineStorefront size={22} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      )}

      <InfoModal
        className={styles.infoModal}
        trigger={MODAL_INFO_ID}
        address={fair?.address}
        contactPhone={fair?.contactPhone}
        contactEmail={fair?.contactEmail}
      />
      <ModalPhotos
        trigger={MODAL_PHOTOS_ID}
        photographs={fair?.photographs || []}
        isLoading={isLoading || isLoadingPhoto || isDeletingPhoto}
        handleAction={
          user?.uid === fair?.owner.id ? handleGalleryAction : undefined
        }
        isCoverText="Fotografía de Perfil"
      />
      <FairModalMap trigger={MODAL_MAP_ID} fair={fair} isLoading={isLoading} />
      <FairModalStands
        trigger={MODAL_STANDS_ID}
        stands={stands}
        handleRefresh={handleRefreshStands}
        handleInfinite={handleInfiniteStands}
        isLoading={isLoadingStands}
      />
    </>
  );
};
