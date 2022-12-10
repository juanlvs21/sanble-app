import dayjs from "dayjs";
import { HiOutlineCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFair";

import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { Stars } from "@/components/common/Stars";
import { useUser } from "@/hooks/useUser";
import styles from "./FairCardList.module.css";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
};

// TODO: This card should change to a different layout on desktop screens. They suggested a large card with the whole cover in the background. Above a div with a gradient and the information it at the bottom of the card
export const FairCardList: React.FC<ComponentProps> = ({ fair }) => {
  const isMobileS = useMediaQuery({ query: "(max-width: 320px)" });
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
        <picture>
          <img src={fair.coverUrl} alt={fair.name} />
        </picture>
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
