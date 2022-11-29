import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosCloseCircleOutline } from "react-icons/io";
import { RiMapPinLine } from "react-icons/ri";
import { TiStarOutline } from "react-icons/ti";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { Fetcher } from "@/components/common/Fetcher";
import { Skeleton } from "@/components/common/Skeleton";
import { TopBar } from "@/components/common/TopBar";
import { EColors } from "@/helpers/colors";
import { fairType } from "@/helpers/fairs";
import { getNavStateText } from "@/helpers/navigation";
import { useApp } from "@/hooks/useApp";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useFairs } from "@/hooks/useFairs";
import { useStatusBar } from "@/hooks/useStatusBar";
import { useUser } from "@/hooks/useUser";
import styles from "./FairDetails.module.css";

export const FairDetails: React.FC = () => {
  const { fairID } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { scrollTop } = useApp();
  const { backgroundStatusBar } = useStatusBar();
  const { user, loadingSetFav, handleSetFavoriteFair } = useUser();
  const {
    handleLoadFairDetails,
    fairDetails: fair,
    isLoadingFairDetails: isLoading,
  } = useFairs({ fairID: fairID || "" });
  useDocumentTitle(
    `${
      getNavStateText(fairID, state?.fairID, state?.fairName) ||
      fair?.name ||
      "Feria"
    } 🛍️`
  );
  const [openCover, setOpenCover] = useState(false);

  useEffect(() => {
    if (scrollTop > 25) {
      backgroundStatusBar(EColors.LIGH);
    } else {
      backgroundStatusBar(EColors.PRIMARY);
    }
  }, [scrollTop]);

  useEffect(() => {
    if (fairID) {
      handleLoadFairDetails();
    }
  }, []);

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
      <Fetcher
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
        <div className={styles.fairDetailsBg}>
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
          <picture
            className={`${styles.fairCover} ${
              openCover ? styles.fairCoverOpen : ""
            }`}
          >
            {isLoading ? (
              <Skeleton
                className={`${styles.fairSkeleton} animate__animated animate__fadeIn`}
              />
            ) : (
              <img
                src={fair?.coverUrl}
                alt={fair?.name}
                className={`${
                  openCover ? styles.fairCoverOpen : ""
                } animate__animated animate__fadeIn`}
                onClick={() => setOpenCover((state) => !state)}
              />
            )}
          </picture>
        </div>
        <section className={styles.fairDetailsContent}>
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
                    <TiStarOutline size={22} color="#FFF" />
                  </span>
                  <span className="animate__animated animate__fadeIn">{`${
                    fair?.stars || 0
                  }`}</span>
                </>
              )}
            </div>
          </div>
          <div className={styles.fairDetailsInfo}>
            {isLoading ? (
              <Skeleton
                width="100%"
                height={20}
                style={{ margin: "5px 0px" }}
              />
            ) : (
              <h6>{fair ? fairType[`${fair?.type}_long`] : ""}</h6>
            )}
            <div className={styles.fairDetailsInfoDescription}>
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
            </div>
            {!isLoading && fair && (
              <div
                className={`${styles.fairDetailsInfoAddress} animate__animated animate__fadeIn`}
              >
                <i>
                  <RiMapPinLine size={25} />
                </i>
                <span>{fair.address}</span>
              </div>
            )}
          </div>
        </section>
      </Fetcher>
    </>
  );
};
