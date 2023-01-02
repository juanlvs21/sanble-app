import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { HiOutlinePhotograph } from "react-icons/hi";
import { IoIosArrowBack, IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineStorefront } from "react-icons/md";
import { TiStar } from "react-icons/ti";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { Fetcher } from "@/components/common/Fetcher";
import { ImageExtended } from "@/components/common/Image";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
import { Reviews } from "@/components/modules/Reviews";
import { EColors } from "@/helpers/colors";
import { fairType } from "@/helpers/fairs";
import { getNavStateText } from "@/helpers/navigation";
import { reviewSchema } from "@/helpers/validator/schema";
import { useFairDetails } from "@/hooks/fairs/useFairDetails";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useStatusBar } from "@/hooks/useStatusBar";
import { useUser } from "@/hooks/useUser";
import { TReviewForm } from "@/types/TReview";
import styles from "./FairDetails.module.css";

export const FairDetails: React.FC = () => {
  const { fairID } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { scrollTop } = useApp();
  const { backgroundStatusBar } = useStatusBar();
  const { user, loadingSetFav, handleSetFavoriteFair } = useUser();
  const {
    fair,
    review,
    isLoading,
    isSaving,
    isLoadingReviews,
    handleSaveReview,
    handleRefreshReviews,
    handleInfiniteReviews,
  } = useFairDetails(fairID || "");
  const [openCover, setOpenCover] = useState(false);

  useDocumentTitle(
    `${
      getNavStateText(fairID, state?.fairID, state?.fairName) ||
      fair?.name ||
      "Feria"
    } 🛍️`
  );

  useEffect(() => {
    if (scrollTop > 25) {
      backgroundStatusBar(EColors.LIGH);
    } else {
      backgroundStatusBar(EColors.PRIMARY);
    }
  }, [scrollTop]);

  return (
    <>
      <TopBar
        title="Detalles"
        start={
          <Button onClick={() => navigate(-1)}>
            <IoIosArrowBack size={24} />
          </Button>
        }
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
        className={`${styles.fairDetailsBg} ${
          openCover ? styles.fairCoverOpen : ""
        }`}
      />

      <Fetcher
        handleRefresh={handleRefreshReviews}
        handleInfiniteScroll={handleInfiniteReviews}
        refreshSpinnerColor="medium"
        classNameSection={`${styles.fairDetailsFetcherSection} ${
          openCover ? styles.fairCoverOpen : ""
        }`}
        classNameContent={`${styles.fairDetailsFetcherContent} ${
          openCover ? styles.fairCoverOpen : ""
        }`}
      >
        <div
          className={`${styles.fairDetailsOverlay} ${
            openCover ? styles.fairCoverOpen : ""
          }`}
        />
        <div className={styles.fairDetailsCoverContainer}>
          {openCover && (
            <Button
              fill="solid"
              color="light"
              size="small"
              onClick={() => setOpenCover((state) => !state)}
              className={`${styles.fairDetailsCoverBtnClose} animate__animated animate__zoomIn`}
            >
              <IoIosCloseCircleOutline size={24} />
            </Button>
          )}

          <ImageExtended
            src={fair?.coverUrl}
            alt={fair?.name}
            isLoading={!fair}
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
          className={`${styles.fairDetailsContent} ${
            openCover ? styles.fairCoverOpen : ""
          }`}
        >
          <div className={styles.fairDetailsNameContainer}>
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
            <div className={styles.fairDetailsNameStars}>
              {!isLoading && (
                <>
                  <span
                    className={`${styles.fairDetailsNameStarsIcon} animate__animated animate__fadeIn`}
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
              <h6 className={styles.fairDetailsType}>
                {fair ? fairType[`${fair?.type}_long`] : ""}
              </h6>
            )}
            <section className={styles.fairDetailsInfoDescription}>
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

            <section className={styles.fairDetailsInfo}>
              <div className={styles.fairDetailsInfoCard}>
                <AiOutlineInfoCircle size={35} />
                <h5>Información de Contacto</h5>
              </div>
              <div className={styles.fairDetailsInfoCard}>
                <FiMapPin size={35} />
                <h5>Localización en Mapa</h5>
              </div>
              <div className={styles.fairDetailsInfoCard}>
                <HiOutlinePhotograph size={35} />
                <h5>Fotos</h5>
              </div>
              <div className={styles.fairDetailsInfoCard}>
                <MdOutlineStorefront size={35} />
                <h5>Stands </h5>
              </div>
            </section>

            <Reviews
              title="Califica esta Feria"
              subTitle="Comparte tu opinión con otros usuarios"
              review={review}
              handleSave={handleSaveReview}
              isLoading={isSaving || isLoadingReviews}
            />
          </div>
        </section>
      </Fetcher>
    </>
  );
};
