import dayjs from "dayjs";
import { HiOutlineCalendar } from "react-icons/hi";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFairs";

import { ButtonFav } from "@/components/common/buttons/ButtonFav";
import { Stars } from "@/components/common/Stars";
import styles from "./FairCardList.module.css";

type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
};

export const FairCardList: React.FC<ComponentProps> = ({ fair }) => {
  return (
    <div className={styles.fairListCard}>
      <picture>
        <img src={fair.coverUrl} alt={fair.name} />
      </picture>
      <div className={styles.fairListCardContent}>
        <h1>{fair.name}</h1>
        <Stars />
        <span className={styles.fairListCardType}>{fairType[fair.type]}</span>

        <div className={styles.fairListCardDate}>
          {/* TODO: Replace to celebrationDate */}
          <HiOutlineCalendar size={17} />
          <span>{dayjs(fair.creationTime).format("DD MMM")}</span>
        </div>
      </div>
      <ButtonFav className={styles.fairListCardBtnFav} />
    </div>
  );
};
