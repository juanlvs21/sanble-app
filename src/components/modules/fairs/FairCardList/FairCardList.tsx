import { HiOutlineCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFair";

import { ImageExtended } from "@/components/common/ImageExtended";
import { Stars } from "@/components/common/Stars";
import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { dayjs } from "@/helpers/time";
import { useUser } from "@/hooks/useUser";
import { ERoutesName } from "@/types/TRoutes";
import styles from "./FairCardList.module.css";
import { Button } from "@/components/common/buttons/Button";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
  /**
   *  Go back url details
   */
  goBackUrl?: string;
  /**
   * If true, the button will ask for confirmation before removing from favorites.
   */
  withConfirmRemoveFav?: boolean;
  handleRemove?: (fairId: string) => void;
};

export const FairCardList = ({
  fair,
  goBackUrl,
  withConfirmRemoveFav = false,
  handleRemove,
}: ComponentProps) => {
  const isMobileS = useMediaQuery("(max-width: 320px)");
  const { user, isLoading: loadingSetFav, handleSetFavoriteFair } = useUser();

  const isFavorite = user?.favoriteFairs.includes(fair.id);

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.fairListCard}`}
      style={handleRemove ? { height: 160 } : {}}
    >
      <Link
        to={`${ERoutesName.FAIRS_LIST}/${fair.id}`}
        state={{ fairID: fair.id, fairName: fair.name, goBackUrl }}
        className={styles.fairListCardLink}
      >
        <ImageExtended
          src={fair?.coverUrl}
          alt={fair?.name}
          classNamePicture={styles.fairListCardPicture}
          className={styles.fairListCardImg}
          skeletonProps={{
            className: styles.fairListCardImg,
          }}
        />
        <div className={styles.fairListCardContent}>
          <h1>{fair.name}</h1>
          <Stars value={fair.stars} />
          {/* <span className={styles.fairListCardType}>
            {fairType[`${fair.type}${isMobileS ? "_short" : "_long"}`]}
          </span> */}

          <div className={styles.fairListCardDate}>
            <HiOutlineCalendar size={17} />
            <span>
              {fair.celebrationDate
                ? dayjs(fair.celebrationDate).format("DD MMM")
                : "Próximamente"}
            </span>
          </div>

          {handleRemove && (
            <Button
              color="danger"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleRemove(fair.id);
              }}
              size="small"
              style={{ marginTop: "auto", width: 180 }}
            >
              Abandonar Feria
            </Button>
          )}
        </div>
      </Link>

      {/* {user?.uid !== fair.owner.uid && ()} We should hide fav button if you are the owner */}
      <ButtonFav
        className={styles.fairListCardBtnFav}
        isLoading={loadingSetFav}
        isActive={isFavorite}
        onClick={() =>
          handleSetFavoriteFair(fair.id, isFavorite, {
            withConfirmRemove: withConfirmRemoveFav,
          })
        }
      />
    </article>
  );
};
