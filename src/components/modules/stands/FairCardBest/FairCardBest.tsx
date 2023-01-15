import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { fairType } from "@/helpers/fairs";
import { TFair } from "@/types/TFair";
import styles from "./FairCardBest.module.css";
import { HiOutlineCalendar } from "react-icons/hi";
import { dayjs } from "@/helpers/time";
import { ImageExtended } from "@/components/common/ImageExtended";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
};

export const FairCardBest = ({ fair }: ComponentProps) => {
  const isMobileM = useMediaQuery("(max-width: 375px)");

  return (
    <Link
      to={`/app/ferias/${fair.id}`}
      state={{ fairID: fair.id, fairName: fair.name }}
    >
      <article
        className={`${styles.fairBestCard} animate__animated animate__fadeIn`}
      >
        <ImageExtended
          src={fair.coverUrl}
          alt={fair.name}
          classNamePicture={styles.fairBestCover}
          className={styles.fairBestCoverImg}
          skeletonProps={{
            className: styles.fairBestCoverImg,
          }}
        />

        <div className={styles.fairBestContent}>
          <h1>{fair.name}</h1>

          <span className={styles.fairBestCardType}>
            {fairType[`${fair.type}${isMobileM ? "_short" : "_long"}`]}
          </span>

          <div className={styles.fairBestCardDate}>
            <HiOutlineCalendar size={15} />
            <span>
              {fair.celebrationDate
                ? dayjs(fair.celebrationDate).format("DD MMM - hh:mm a")
                : "Próximamente"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
