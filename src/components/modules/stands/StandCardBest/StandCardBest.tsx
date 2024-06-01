import { Link } from "react-router-dom";

import { ImageExtended } from "@/components/common/ImageExtended";
import { ERoutesName } from "@/types/TRoutes";
import { TStand } from "@/types/TStand";
import styles from "./StandCardBest.module.css";
import { Stars } from "@/components/common/Stars";

export type ComponentProps = {
  /**
   * Stand Details
   */
  stand: TStand;
};

export const StandCardBest = ({ stand }: ComponentProps) => {
  return (
    <Link
      to={`${ERoutesName.STANDS_LIST}/${stand.id}`}
      state={{
        standID: stand.id,
        standName: stand.name,
        goBackUrl: ERoutesName.APP,
      }}
    >
      <article className={styles.standBestCard}>
        <ImageExtended
          src={stand.coverUrl}
          alt={stand.name}
          classNamePicture={styles.standBestCover}
          className={styles.standBestCoverImg}
          skeletonProps={{
            className: styles.standBestCoverImg,
          }}
        />

        <div className={styles.standBestContent}>
          <h1>{stand.name}</h1>

          <Stars value={stand.stars} />
        </div>
      </article>
    </Link>
  );
};
