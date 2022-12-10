import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFair";
import styles from "./FairCardBest.module.css";
import { HiOutlineCalendar } from "react-icons/hi";
import dayjs from "dayjs";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
};

// TODO: This card should change to a different layout on desktop screens. They suggested a large card with the whole cover in the background. Above a div with a gradient and the information it at the bottom of the card
export const FairCardBest: React.FC<ComponentProps> = ({ fair }) => {
  const isMobileM = useMediaQuery({ query: "(max-width: 375px)" });

  return (
    <Link
      to={`/app/ferias/${fair.id}`}
      state={{ fairID: fair.id, fairName: fair.name }}
    >
      <article className={styles.fairBestCard}>
        <picture className={styles.fairBestCover}>
          <img src={fair.coverUrl} alt={fair.name} />
        </picture>
        <div className={styles.fairBestContent}>
          <h1>{fair.name}</h1>

          <span className={styles.fairBestCardType}>
            {fairType[`${fair.type}${isMobileM ? "_short" : "_long"}`]}
          </span>

          <div className={styles.fairBestCardDate}>
            <HiOutlineCalendar size={15} />
            <span>
              {fair.celebrationDate
                ? dayjs(fair.celebrationDate).format("DD MMM - HH:mm")
                : "Próximamente"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
