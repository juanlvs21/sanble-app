import { Link } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
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
  withConfirmRemoveFav?: boolean;
  handleRemove?: (standId: string) => void;
};

export const StandCardList = ({
  stand,
  goBackUrl,
  handleRemove,
  className = "",
  withConfirmRemoveFav = false,
}: ComponentProps) => {
  const { user, isLoading: loadingSetFav, handleSetFavoriteStand } = useUser();

  const isFavorite = user?.favoriteStands.includes(stand.id);

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.standListCard} ${className}`}
      style={handleRemove ? { height: 160 } : {}}
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

          {handleRemove && (
            <Button
              color="danger"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleRemove(stand.id);
              }}
              size="small"
              style={{ marginTop: "auto" }}
            >
              Eliminar Stand
            </Button>
          )}
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
            withConfirmRemove: withConfirmRemoveFav,
          })
        }
      />
    </article>
  );
};
