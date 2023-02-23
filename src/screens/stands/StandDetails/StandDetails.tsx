import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonPage,
  useIonActionSheet,
  useIonAlert,
} from "@ionic/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit2, FiMapPin } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";
import { TiStar } from "react-icons/ti";
import {
  RouteComponentProps,
  useHistory,
  useLocation,
  useParams,
} from "react-router";
import { BiStoreAlt } from "react-icons/bi";

import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
// import { StandModalFairs } from "@/components/modules/stands/StandModalFairs";
// import { InfoModal } from "@/components/modules/info/InfoModal";
// import { ModalPhotos } from "@/components/modules/photo/ModalPhotos";
import { ReviewForm } from "@/components/modules/reviews/ReviewForm";
import { ReviewsList } from "@/components/modules/reviews/ReviewsList";
import { getNavStateText } from "@/helpers/navigation";
import { useStandDetails } from "@/hooks/stands/useStandDetails";
// import { useStandPhoto } from "@/hooks/stands/useStandPhoto";
// import { useStandFairs } from "@/hooks/stands/useStandFairs";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useUser } from "@/hooks/useUser";
import { TStandRouteState } from "@/types/TStand";
import styles from "./StandDetails.module.css";

const MODAL_INFO_ID = "stand-info-open-modal";
const MODAL_STANDS_ID = "stand-stands-open-modal";
const MODAL_PHOTOS_ID = "stand-photos-open-modal";

type TRouteParams = { standID: string };

type TPageProps = RouteComponentProps<{}>;

export const StandDetails: React.FC<TPageProps> = (props) => {
  const history = useHistory();
  const [present] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const { standID } = useParams<TRouteParams>();
  const { state } = useLocation<TStandRouteState>();
  const finalStandID = standID || state?.standID || "";
  const {
    stand,
    review,
    reviews,
    isLoading,
    isSaving,
    isLoadingReviews,
    handleLoadAll,
    handleSaveReview,
    handleRefreshReviews,
    handleInfiniteReviews,
  } = useStandDetails(finalStandID);
  // const {
  //   stands,
  //   isLoading: isLoadingStands,
  //   handleLoad: handleRefreshStands,
  //   handleInfinite: handleInfiniteStands,
  // } = useStandFairs(finalStandID);
  // const {
  //   handleDeletePhoto,
  //   isLoading: isLoadingPhoto,
  //   isDeletingPhoto,
  // } = useStandPhoto(finalStandID);
  const { user, loadingSetFav, handleSetFavoriteStand } = useUser();

  useDocumentTitle(
    `${
      getNavStateText(standID, state?.standID, state?.standName) ||
      stand?.name ||
      "Stand"
    } 🛍️`
  );

  return (
    <IonPage>
      <TopBar
        title="Detalles"
        startGoBack
        startGoBackUrl={state?.goBackUrl || "/app/stands"}
        end={
          <ButtonFav
            isLoading={loadingSetFav}
            color="light"
            spinnerColor="dark"
            isActive={user?.favoriteStands.includes(stand?.id || "")}
            onClick={() =>
              stand ? handleSetFavoriteStand(stand.id) : undefined
            }
          />
        }
        titleSize={24}
        titleLight
        sticky
      />

      <div
        className={`${styles.standCoverBg} animate__animated animate__fadeIn`}
      />

      <Fetcher
        handleRefresh={handleRefreshReviews}
        handleInfiniteScroll={handleInfiniteReviews}
        refreshSpinnerColor="medium"
        classNameSection={`${styles.standFetcherSection} animate__animated animate__screenInUp `}
        classNameContent={`${styles.standFetcherContent}`}
        classNameInfinite={styles.standFetcherInfinite}
      >
        <div className={styles.standCoverContainer}>
          <ImageExtended
            src={stand?.coverUrl}
            alt={stand?.name}
            isLoading={!stand || isLoading}
            classNamePicture={`${styles.standCover}`}
            skeletonProps={{
              className: styles.standSkeleton,
            }}
          />
        </div>
        <section className={`${styles.standContent}`}>
          <div className={styles.standNameContainer}>
            {getNavStateText(standID, state?.standID, state?.standName) ? (
              <h1>
                {getNavStateText(standID, state?.standID, state?.standName)}
              </h1>
            ) : (
              <>
                {isLoading ? (
                  <Skeleton width="100%" height={35} />
                ) : (
                  <h1>{stand?.name}</h1>
                )}
              </>
            )}
            <div className={styles.standNameStars}>
              {!isLoading && (
                <>
                  <span
                    className={`${styles.standNameStarsIcon} animate__animated animate__fadeIn`}
                  >
                    <TiStar size={25} />
                  </span>
                  <span className="animate__animated animate__fadeIn">
                    {`${stand?.stars || 0}`}
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
              <h6 className={styles.standSlogan}>{stand?.slogan}</h6>
            )}
            <section className={styles.standDescription}>
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
                <p>{stand?.description}</p>
              )}
            </section>

            <section className={styles.standInfo}>
              <div
                className={`${styles.standInfoCard} ${
                  isLoading ? styles.isLoading : ""
                }`}
                id={MODAL_INFO_ID}
              >
                <AiOutlineInfoCircle size={35} />
                <h5>Información de Contacto</h5>
              </div>
              <div
                className={`${styles.standInfoCard} ${
                  isLoading ? styles.isLoading : ""
                }`}
                id={MODAL_PHOTOS_ID}
              >
                <HiOutlinePhotograph size={35} />
                <h5>Fotos</h5>
              </div>
              <div
                className={`${styles.standInfoCard} ${
                  isLoading ? styles.isLoading : ""
                }`}
                id={MODAL_STANDS_ID}
              >
                <BiStoreAlt size={35} />
                <h5>Ferias </h5>
              </div>
            </section>

            <section
              className={`${styles.standReviewsContainer} animate__animated animate__fadeIn`}
            >
              <h3>Califica este Stand</h3>
              <p>Comparte tu opinión con otros usuarios</p>

              <ReviewForm
                review={review}
                handleSave={handleSaveReview}
                isLoading={isSaving || isLoading}
              />
              <ReviewsList
                reviews={reviews}
                isLoading={isLoadingReviews && !reviews?.length}
                className={styles.standReviewsList}
              />
            </section>
          </div>
        </section>
      </Fetcher>

      {/* {user?.uid === stand?.owner.id && (
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className={`${styles.standFloatBtn} animate__animated animate__fadeIn`}
        >
          <IonFabButton color="secondary">
            <IoIosArrowUp size={28} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton color="secondary">
              <FiEdit2 size={22} />
            </IonFabButton>
            <IonFabButton color="secondary">
              <BiStoreAlt size={22} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      )} */}

      {/* <InfoModal
        className={styles.infoModal}
        trigger={MODAL_INFO_ID}
        address={stand?.address}
        contactPhone={stand?.contactPhone}
        contactEmail={stand?.contactEmail}
      />
      <ModalPhotos
        trigger={MODAL_PHOTOS_ID}
        photographs={stand?.photographs || []}
        isLoading={isLoading || isLoadingPhoto || isDeletingPhoto}
        handleAction={
          user?.uid === stand?.owner.id ? handleGalleryActions : undefined
        }
        isCoverText="Fotografía de Perfil"
      />
      <StandModalFairs
        trigger={MODAL_STANDS_ID}
        stands={stands}
        handleRefresh={handleRefreshStands}
        handleInfinite={handleInfiniteStands}
        isLoading={isLoadingStands}
      /> */}
    </IonPage>
  );
};
