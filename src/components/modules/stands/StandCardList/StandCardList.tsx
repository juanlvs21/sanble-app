import { Link } from "react-router-dom";

import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Stars } from "@/components/common/Stars";
import { useUser } from "@/hooks/useUser";
import { TStand } from "@/types/TStand";
import styles from "./StandCardList.module.css";

export type ComponentProps = {
  /**
   * Stand Details
   */
  stand: TStand;
  /**
   *  Go back url details
   */
  goBackUrl?: string;
  /**
   * Custom className component
   */
  className?: string;
  /**
   * If true, the button will ask for confirmation before removing from favorites.
   */
  withConfirmRemove?: boolean;
};

export const StandCardList = ({
  stand,
  goBackUrl,
  className = "",
  withConfirmRemove = false,
}: ComponentProps) => {
  const { user, isLoading: loadingSetFav, handleSetFavoriteStand } = useUser();

  const isFavorite = user?.favoriteStands.includes(stand.id);

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.standListCard} ${className}`}
    >
      <Link
        to={`/app/stands/${stand.id}`}
        state={{ standID: stand.id, standName: stand.name, goBackUrl }}
        className={styles.standListCardLink}
      >
        <div className={styles.standListCardContent}>
          <h1>{stand.name}</h1>
          <Stars value={stand.stars} />

          <p className={styles.standListCardSlogan}>{stand.slogan}</p>
        </div>
        <ImageExtended
          src={stand?.coverUrl}
          alt={stand?.name}
          classNamePicture={styles.standListCardPicture}
          className={styles.standListCardImg}
          skeletonProps={{
            className: styles.standListCardImg,
          }}
        />
      </Link>

      {/* {user?.uid !== stand.owner.uid && ()} We should hide fav button if you are the owner */}
      <ButtonFav
        className={styles.standListCardBtnFav}
        isLoading={loadingSetFav}
        isActive={isFavorite}
        onClick={() =>
          handleSetFavoriteStand(stand.id, isFavorite, {
            withConfirmRemove,
          })
        }
      />
    </article>
  );
};
