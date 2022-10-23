import { HiOutlineCalendar } from "react-icons/hi";
import dayjs from "dayjs";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFairs";

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
        <span>{fairType[fair.type]}</span>

        <div className={styles.fairListCardDate}>
          {/* TODO: Replace to celebrationDate */}
          <HiOutlineCalendar size={17} />
          <span>{dayjs(fair.creationTime).format("DD MMM")}</span>
        </div>
      </div>
    </div>
  );
};
