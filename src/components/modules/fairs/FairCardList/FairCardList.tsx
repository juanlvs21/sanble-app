import dayjs from "dayjs";
import { HiOutlineCalendar } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFairs";

import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { Stars } from "@/components/common/Stars";
import { useUser } from "@/hooks/useUser";
import styles from "./FairCardList.module.css";

type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
};

export const FairCardList: React.FC<ComponentProps> = ({ fair }) => {
  const navigate = useNavigate();
  const { user, loadingSetFav, handleSetFavoriteFair } = useUser();

  return (
    <div
      className={`animate__animated animate__fadeIn ${styles.fairListCard}`}
      onClick={() => navigate(`/app/ferias/${fair.id}`)}
    >
      <picture>
        <img src={fair.coverUrl} alt={fair.name} />
      </picture>
      <div className={styles.fairListCardContent}>
        <h1>{fair.name}</h1>
        <Stars value={fair.stars} />
        <span className={styles.fairListCardType}>{fairType[fair.type]}</span>

        <div className={styles.fairListCardDate}>
          <HiOutlineCalendar size={17} />
          <span>
            {fair.celebrationDate
              ? dayjs(fair.celebrationDate).format("DD MMM")
              : "Próximamente"}
          </span>
        </div>
      </div>

      {/* {user?.uid !== fair.owner.id && ()} We should hide fav button if you are the owner */}
      <ButtonFav
        className={styles.fairListCardBtnFav}
        isLoading={loadingSetFav}
        isActive={user?.favoriteFairs.includes(fair.id)}
        onClick={() => handleSetFavoriteFair(fair.id)}
      />
    </div>
  );
};
