import { Link } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import { ImageExtended } from "@/components/common/ImageExtended";
import { fairType } from "@/helpers/fairs";
import { dayjs } from "@/helpers/time";
import { TFair } from "@/types/TFair";
import { ERoutesName } from "@/types/TRoutes";
import { HiOutlineCalendar } from "react-icons/hi";
import styles from "./FairCardBest.module.css";
import { Stars } from "@/components/common/Stars";
import { getCelebrationFair } from "@/helpers/celebrationFair";

export type ComponentProps = {
  /**
   * Fair Details
   */
  fair: TFair;
};

export const FairCardBest = ({ fair }: ComponentProps) => {
  const isMobileM = useMediaQuery("(max-width: 375px)");

  const celebration = getCelebrationFair(fair);

  return (
    <Link
      to={`${ERoutesName.FAIRS_LIST}/${fair.id}`}
      state={{
        fairID: fair.id,
        fairName: fair.name,
        goBackUrl: ERoutesName.APP,
      }}
    >
      <article className={styles.fairBestCard}>
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

          {/* <span className={styles.fairBestCardType}>
            {fairType[`${fair.type}${isMobileM ? "_short" : "_long"}`]}
          </span> */}

          <Stars value={fair.stars} />

          <div
            className={styles.fairBestCardDate}
            style={{ opacity: celebration ? 1 : 0 }}
          >
            <HiOutlineCalendar size={15} />
            <span>{celebration}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};
