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

          <span className={styles.fairBestCardType}>
            {fairType[`${fair.type}${isMobileM ? "_short" : "_long"}`]}
          </span>

          <Stars value={fair.stars} />

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
