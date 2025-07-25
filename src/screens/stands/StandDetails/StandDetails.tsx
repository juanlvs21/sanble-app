import { IonFab, IonFabButton } from "@ionic/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiImageAdd, BiStoreAlt } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlinePhotograph, HiOutlineShoppingBag } from "react-icons/hi";
import { TiStar } from "react-icons/ti";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/ImageExtended";
import { SegmentDetails } from "@/components/common/SegmentDetails";
import { Skeleton } from "@/components/common/Skeleton";
import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { InfoModal } from "@/components/modules/info/InfoModal";
import { PostForm } from "@/components/modules/post/PostForm";
import { PostList } from "@/components/modules/post/PostList";
import { ReviewForm } from "@/components/modules/reviews/ReviewForm";
import { ReviewsList } from "@/components/modules/reviews/ReviewsList";
import { InviteToMyFairModal } from "@/components/modules/stands/InviteToMyFairModal";
import { StandModalFairs } from "@/components/modules/stands/StandModalFairs";
import { getNavStateText } from "@/helpers/navigation";
import { useStandDetails } from "@/hooks/stands/useStandDetails";
import { useStandFairs } from "@/hooks/stands/useStandFairs";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useSegmentDetails } from "@/hooks/useSegmentDetails";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { useUser } from "@/hooks/useUser";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./StandDetails.module.css";

const MODAL_INFO_ID = "stand-info-open-modal";
const MODAL_FAIRS_ID = "stand-fairs-open-modal";

type TRouteParams = { standID: string };

const SEGMENT_ITEMS = ["Publicaciones", "Opiniones"];

export const StandDetails = () => {
  const navigate = useNavigate();
  const { standID } = useParams<TRouteParams>();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const { renderTopBarActionEnd } = useTopBarMain();
  const { isCapacitor } = useApp();
  const finalStandID: string = standID || state?.standID || "";
  const { user, isLoading: loadingSetFav, handleSetFavoriteStand } = useUser();

  const {
    stand,
    review,
    reviews,
    posts,
    isSaving,
    isSavingPost,
    isUpdatingPost,
    isLoadingDetails,
    isLoadingReviews,
    isLoadMoreReviews,
    isLoadingPosts,
    isLoadMorePosts,
    showLoadMoreReviewBtn,
    showLoadMorePostBtn,
    handleLoadMorePost,
    handleDeletePost,
    handleUpdatePost,
    handleLoadAll,
    handleSaveReview,
    handleDeleteReview,
    handleSavePost,
    handleLoadMoreReviews,
  } = useStandDetails(finalStandID);
  const {
    fairs,
    isLoading: isLoadingFairs,
    isLoadMore: isLoadMoreFairs,
    showLoadMoreBtn: showLoadMoreFairsBtn,
    handleRefresh: handleRefreshFairs,
    handleLoadMore: handleLoadMoreFairs,
  } = useStandFairs(finalStandID);
  const scrollKey = searchParams.get("post_id");

  const { value: segmentValue, handleChange: segmentHandleChange } =
    useSegmentDetails();

  useDocumentTitleApp(
    `${
      getNavStateText(standID, state?.standID, state?.standName) ||
      stand?.name ||
      "Stand"
    } 🛒`
  );

  return (
    <>
      {renderTopBarActionEnd(
        <ButtonFav
          isLoading={loadingSetFav}
          color="light"
          spinnerColor="dark"
          isActive={user?.favoriteStands.includes(stand?.id || "")}
          onClick={() => (stand ? handleSetFavoriteStand(stand.id) : undefined)}
          className="animate__animated animate__fadeIn"
        />
      )}

      <div
        className={`${styles.standCoverBg} animate__animated animate__fadeIn`}
      />

      <Fetcher
        handleRefresh={handleLoadAll}
        refreshSpinnerColor="medium"
        classNameSection={`${styles.standFetcherSection} ${
          isCapacitor ? styles.isCapacitor : ""
        } animate__animated animate__screenInUp `}
        classNameContent={`${styles.standFetcherContent}`}
        classNameInfinite={styles.standFetcherInfinite}
      >
        <div className={styles.standCoverContainer}>
          <ImageExtended
            src={stand?.coverUrl}
            alt={stand?.name}
            isLoading={isLoadingDetails}
            classNamePicture={`${styles.standCover}`}
            skeletonProps={{
              className: styles.standSkeleton,
            }}
          >
            {user?.uid === stand?.owner.uid && (
              <Link to={`${ERoutesName.STANDS_LIST}/${stand?.id}/fotos/nueva`}>
                <div className={styles.standDetailsChangePhoto}>
                  <BiImageAdd size={64} />
                  <span>
                    {stand?.coverUrl ? "Cambiar Foto" : "Añadir Foto"}
                  </span>
                </div>
              </Link>
            )}
          </ImageExtended>
        </div>
        <section className={`${styles.standContent}`}>
          <div className={styles.standNameContainer}>
            {getNavStateText(standID, state?.standID, state?.fairName) ? (
              <h1>
                {getNavStateText(standID, state?.standID, state?.fairName)}
              </h1>
            ) : (
              <>
                {isLoadingDetails ? (
                  <Skeleton width="100%" height={35} />
                ) : (
                  <h1>{stand?.name}</h1>
                )}
              </>
            )}
            <div className={styles.standNameStars}>
              {!isLoadingDetails && (
                <>
                  <span
                    className={`${styles.standNameStarsIcon} animate__animated animate__fadeIn`}
                  >
                    <TiStar size={25} />
                  </span>
                  <span className="animate__animated animate__fadeIn">
                    {`${stand?.stars ? stand.stars.toFixed(1) : "0.0"}`}
                  </span>
                </>
              )}
            </div>
          </div>
          <div>
            {isLoadingDetails ? (
              <Skeleton
                width="100%"
                height={20}
                style={{ margin: "5px 0px" }}
              />
            ) : (
              <h6 className={styles.standSlogan}>{stand && stand.slogan}</h6>
            )}
            <section className={styles.standDescription}>
              {isLoadingDetails ? (
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
                  isLoadingDetails ? styles.isLoading : ""
                }`}
                id={MODAL_INFO_ID}
              >
                <AiOutlineInfoCircle size={35} />
                <h5>Información de Contacto</h5>
              </div>
              <Link to={`${ERoutesName.STANDS_LIST}/${stand?.id}/fotos`}>
                <div
                  className={`${styles.standInfoCard} ${
                    isLoadingDetails ? styles.isLoading : ""
                  }`}
                >
                  <HiOutlinePhotograph size={35} />
                  <h5>Fotos</h5>
                </div>
              </Link>
              <Link to={`${ERoutesName.STANDS_LIST}/${stand?.id}/productos`}>
                <div
                  className={`${styles.standInfoCard} ${
                    isLoadingDetails ? styles.isLoading : ""
                  }`}
                >
                  <HiOutlineShoppingBag size={35} />
                  <h5>Productos</h5>
                </div>
              </Link>
              <div
                className={`${styles.standInfoCard} ${
                  isLoadingDetails ? styles.isLoading : ""
                }`}
                id={MODAL_FAIRS_ID}
              >
                <BiStoreAlt size={35} />
                <h5>Ferias</h5>
              </div>
            </section>

            <SegmentDetails
              value={segmentValue}
              items={SEGMENT_ITEMS}
              onChange={segmentHandleChange}
              className={`${styles.standSegment}`}
            />

            {segmentValue === 0 && (
              <section
                className={`${styles.standFormContainer} animate__animated animate__fadeIn`}
              >
                {user?.uid === stand?.owner.uid && (
                  <>
                    <h3>Hacer una publicación</h3>
                    <p>Comparte información con tu público</p>

                    <PostForm
                      handleSave={handleSavePost}
                      isLoading={isSavingPost || isLoadingDetails}
                    />
                  </>
                )}

                <PostList
                  posts={posts}
                  isLoading={isLoadingPosts}
                  isLoadMore={isLoadMorePosts}
                  showLoadMoreBtn={showLoadMorePostBtn}
                  handleLoadMore={handleLoadMorePost}
                  handleDelete={handleDeletePost}
                  handleUpdate={handleUpdatePost}
                  isUpdating={isUpdatingPost}
                  isOwner={stand?.owner.uid === user?.uid}
                  scrollPostID={scrollKey}
                />
              </section>
            )}
            {segmentValue === 1 && (
              <section
                className={`${styles.standReviewsContainer} animate__animated animate__fadeIn`}
              >
                <h3>Califica este Stand</h3>
                <p>Comparte tu opinión con otros usuarios</p>

                <ReviewForm
                  review={review}
                  handleSave={handleSaveReview}
                  handleDelete={handleDeleteReview}
                  isLoading={isSaving || isLoadingDetails}
                />
                <ReviewsList
                  reviews={reviews}
                  isLoading={isLoadingReviews && !reviews?.length}
                  isLoadMore={isLoadMoreReviews}
                  showLoadMoreBtn={showLoadMoreReviewBtn}
                  handleLoadMore={handleLoadMoreReviews}
                  className={styles.standReviewsList}
                />
              </section>
            )}
          </div>
        </section>
      </Fetcher>

      {user?.uid === stand?.owner.uid && (
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className={`${styles.standFloatBtn} animate__animated animate__fadeIn`}
        >
          <IonFabButton
            color="secondary"
            onClick={() =>
              navigate(
                `${ERoutesName.STAND_DETAILS_UPDATE.replace(
                  ":standID",
                  stand?.id ?? ""
                )}`
              )
            }
          >
            <FiEdit2 size={22} />
          </IonFabButton>
        </IonFab>
      )}

      <InfoModal
        className={styles.infoModal}
        trigger={MODAL_INFO_ID}
        contactPhone={stand?.contactPhone}
        contactEmail={stand?.contactEmail}
      />

      <StandModalFairs
        trigger={MODAL_FAIRS_ID}
        fairs={fairs}
        stand={stand}
        handleRefresh={handleRefreshFairs}
        handleLoadMore={handleLoadMoreFairs}
        isLoading={isLoadingFairs}
        isLoadingMore={isLoadMoreFairs}
        showLoadMoreBtn={showLoadMoreFairsBtn}
      />

      {Boolean(user?.ownerFairs.length) && stand && (
        <InviteToMyFairModal
          standID={finalStandID}
          standOwnerUid={stand?.owner.uid}
        />
      )}
    </>
  );
};
