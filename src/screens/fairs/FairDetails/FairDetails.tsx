import { IonFab, IonFabButton, IonFabList } from "@ionic/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiEdit2, FiMapPin } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";
import { TiStar } from "react-icons/ti";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/ImageExtended";
import { SegmentDetails } from "@/components/common/SegmentDetails";
import { Skeleton } from "@/components/common/Skeleton";
import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { FairModalStands } from "@/components/modules/fairs/FairModalStands";
import { InfoModal } from "@/components/modules/info/InfoModal";
import { PostForm } from "@/components/modules/post/PostForm";
import { PostList } from "@/components/modules/post/PostList";
import { ReviewForm } from "@/components/modules/reviews/ReviewForm";
import { ReviewsList } from "@/components/modules/reviews/ReviewsList";
import { fairType } from "@/helpers/fairs";
import { getNavStateText } from "@/helpers/navigation";
import { useFairDetails } from "@/hooks/fairs/useFairDetails";
import { useFairStands } from "@/hooks/fairs/useFairStands";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useSegmentDetails } from "@/hooks/useSegmentDetails";
import { useTopBarMain } from "@/hooks/useTopBarMain";
import { useUser } from "@/hooks/useUser";
import { ERoutesName } from "@/types/TRoutes";
import { useEffect } from "react";
import styles from "./FairDetails.module.css";

const MODAL_INFO_ID = "fair-info-open-modal";
const MODAL_STANDS_ID = "fair-stands-open-modal";

const SEGMENT_ITEMS = ["Publicaciónes", "Opiniones"];

type TRouteParams = { fairID: string };

export const FairDetails = () => {
  const navigate = useNavigate();
  const { fairID } = useParams<TRouteParams>();
  const { state } = useLocation();
  const { renderTopBarActionEnd } = useTopBarMain();
  const { isCapacitor } = useApp();
  const finalFairID = fairID || state?.fairID || "";
  const { user, isLoading: loadingSetFav, handleSetFavoriteFair } = useUser();
  const {
    fair,
    review,
    reviews,
    posts,
    isLoadingDetails,
    isSavingReview,
    isLoadingReviews,
    isSavingPost,
    isUpdatingPost,
    isLoadMoreReviews,
    isLoadMorePosts,
    showLoadMoreReviewBtn,
    showLoadMorePostBtn,
    isLoadingPosts,
    handleLoadAll,
    handleSaveReview,
    handleDeleteReview,
    handleSavePost,
    handleLoadMoreReviews,
    handleLoadMorePost,
    handleDeletePost,
    handleUpdatePost,
  } = useFairDetails(finalFairID);
  const {
    stands,
    isLoading: isLoadingStands,
    isLoadMore: isLoadMoreStands,
    showLoadMoreBtn: showLoadMoreStandsBtn,
    handleRefresh: handleRefreshStands,
    handleLoadMore: handleLoadMoreStands,
  } = useFairStands(finalFairID);
  const { scrollRef, scrollKey } = useScrollTo({
    searchParamName: "post_id",
    canScrollTo: !isLoadingDetails && !isLoadingPosts,
  });

  const { value: segmentValue, handleChange: segmentHandleChange } =
    useSegmentDetails();

  useDocumentTitleApp(
    `${
      getNavStateText(fairID, state?.fairID, state?.fairName) ||
      fair?.name ||
      "Feria"
    } 🛍️`
  );

  useEffect(() => {
    handleLoadAll();
  }, [segmentValue]);

  return (
    <>
      {renderTopBarActionEnd(
        <ButtonFav
          isLoading={loadingSetFav}
          color="light"
          spinnerColor="dark"
          isActive={user?.favoriteFairs.includes(fair?.id || "")}
          onClick={() => (fair ? handleSetFavoriteFair(fair.id) : undefined)}
          className="animate__animated animate__fadeIn"
        />
      )}

      <div
        className={`${styles.fairCoverBg} animate__animated animate__fadeIn`}
      />

      <Fetcher
        handleRefresh={handleLoadAll}
        refreshSpinnerColor="medium"
        classNameSection={`${styles.fairFetcherSection} ${
          isCapacitor ? styles.isCapacitor : ""
        } animate__animated animate__screenInUp `}
        classNameContent={`${styles.fairFetcherContent}`}
        classNameInfinite={styles.fairFetcherInfinite}
      >
        <div className={styles.fairCoverContainer}>
          <ImageExtended
            src={fair?.coverUrl}
            alt={fair?.name}
            isLoading={isLoadingDetails}
            classNamePicture={`${styles.fairCover}`}
            skeletonProps={{
              className: styles.fairSkeleton,
            }}
          />
        </div>
        <section className={`${styles.fairContent}`}>
          <div className={styles.fairNameContainer}>
            {getNavStateText(fairID, state?.fairID, state?.fairName) ? (
              <h1>{getNavStateText(fairID, state?.fairID, state?.fairName)}</h1>
            ) : (
              <>
                {isLoadingDetails ? (
                  <Skeleton width="100%" height={35} />
                ) : (
                  <h1>{fair?.name}</h1>
                )}
              </>
            )}
            <div className={styles.fairNameStars}>
              {!isLoadingDetails && (
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
            {isLoadingDetails ? (
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
                <p>{fair?.description}</p>
              )}
            </section>

            <section className={styles.fairInfo}>
              <div
                className={`${styles.fairInfoCard} ${
                  isLoadingDetails ? styles.isLoading : ""
                }`}
                id={MODAL_INFO_ID}
              >
                <AiOutlineInfoCircle size={35} />
                <h5>Información de Contacto</h5>
              </div>
              <Link to={`${ERoutesName.FAIRS_LIST}/${fair?.id}/mapa`}>
                <div
                  className={`${styles.fairInfoCard} ${
                    isLoadingDetails ? styles.isLoading : ""
                  }`}
                >
                  <FiMapPin size={35} />
                  <h5>Localización en Mapa</h5>
                </div>
              </Link>
              <Link to={`${ERoutesName.FAIRS_LIST}/${fair?.id}/fotos`}>
                <div
                  className={`${styles.fairInfoCard} ${
                    isLoadingDetails ? styles.isLoading : ""
                  }`}
                >
                  <HiOutlinePhotograph size={35} />
                  <h5>Fotos</h5>
                </div>
              </Link>
              <div
                className={`${styles.fairInfoCard} ${
                  isLoadingDetails ? styles.isLoading : ""
                }`}
                id={MODAL_STANDS_ID}
              >
                <MdOutlineStorefront size={35} />
                <h5>Stands </h5>
              </div>
            </section>

            <SegmentDetails
              value={segmentValue}
              items={SEGMENT_ITEMS}
              onChange={segmentHandleChange}
              className={`${styles.fairSegment}`}
            />

            {segmentValue === 0 && (
              <section
                className={`${styles.fairFormContainer} animate__animated animate__fadeIn`}
              >
                {user?.uid === fair?.owner.uid && (
                  <h3>Hacer una publicación</h3>
                )}

                {user?.uid === fair?.owner.uid && (
                  <>
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
                  handleUpdate={handleUpdatePost}
                  isUpdating={isUpdatingPost}
                  handleDelete={handleDeletePost}
                  isOwner={fair?.owner.uid === user?.uid}
                  scrollRef={scrollRef}
                  scrollPostID={scrollKey}
                />
              </section>
            )}
            {segmentValue === 1 && (
              <section
                className={`${styles.fairFormContainer} animate__animated animate__fadeIn`}
              >
                <h3>Califica esta Feria</h3>
                <p>Comparte tu opinión con otros usuarios</p>

                <ReviewForm
                  review={review}
                  handleSave={handleSaveReview}
                  handleDelete={handleDeleteReview}
                  isLoading={isSavingReview || isLoadingDetails}
                />
                <ReviewsList
                  reviews={reviews}
                  isLoading={isLoadingReviews && !reviews?.length}
                  isLoadMore={isLoadMoreReviews}
                  showLoadMoreBtn={showLoadMoreReviewBtn}
                  handleLoadMore={handleLoadMoreReviews}
                  className={styles.fairList}
                />
              </section>
            )}
          </div>
        </section>
      </Fetcher>

      {user?.uid === fair?.owner.uid && (
        <IonFab
          slot="fixed"
          vertical="bottom"
          horizontal="end"
          className={`${styles.fairFloatBtn} animate__animated animate__fadeIn`}
        >
          <IonFabButton color="secondary">
            <IoIosArrowUp size={28} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton
              color="secondary"
              onClick={() =>
                navigate(
                  `${ERoutesName.FAIR_DETAILS_UPDATE.replace(
                    ":fairID",
                    fair?.id ?? ""
                  )}`
                )
              }
            >
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
      <FairModalStands
        trigger={MODAL_STANDS_ID}
        stands={stands}
        handleRefresh={handleRefreshStands}
        handleLoadMore={handleLoadMoreStands}
        isLoading={isLoadingStands}
        isLoadingMore={isLoadMoreStands}
        showLoadMoreBtn={showLoadMoreStandsBtn}
      />
    </>
  );
};
