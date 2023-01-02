import { dayjs } from "@/helpers/time";
import { HiOutlineCalendar } from "react-icons/hi";
import { useMediaQuery } from "usehooks-ts";
import { Link } from "react-router-dom";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFair";

import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { ImageExtended } from "@/components/common/ImageExtended";
import { Stars } from "@/components/common/Stars";
import { useUser } from "@/hooks/useUser";
import styles from "./FairCardList.module.css";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
};

export const FairCardList: React.FC<ComponentProps> = ({ fair }) => {
  const isMobileS = useMediaQuery("(max-width: 320px)");
  const { user, loadingSetFav, handleSetFavoriteFair } = useUser();

  return (
    <article
      className={`animate__animated animate__fadeIn ${styles.fairListCard}`}
    >
      <Link
        to={`/app/ferias/${fair.id}`}
        state={{ fairID: fair.id, fairName: fair.name }}
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
          <span className={styles.fairListCardType}>
            {fairType[`${fair.type}${isMobileS ? "_short" : "_long"}`]}
          </span>

          <div className={styles.fairListCardDate}>
            <HiOutlineCalendar size={17} />
            <span>
              {fair.celebrationDate
                ? dayjs(fair.celebrationDate).format("DD MMM")
                : "Próximamente"}
            </span>
          </div>
        </div>
      </Link>

      {/* {user?.uid !== fair.owner.id && ()} We should hide fav button if you are the owner */}
      <ButtonFav
        className={styles.fairListCardBtnFav}
        isLoading={loadingSetFav}
        isActive={user?.favoriteFairs.includes(fair.id)}
        onClick={() => handleSetFavoriteFair(fair.id)}
      />
    </article>
  );
};
