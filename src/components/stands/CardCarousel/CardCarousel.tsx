import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonCardTitle,
} from "@ionic/react";

import styles from "./CardCarousel.module.css";
import { Stars } from "@/components/common/Stars";
import { Skeleton } from "@/components/common/Skeleton";
import { mockStand } from "@/utils/mockData";
import { getImage } from "@/utils/getImage";
import { TStand } from "@/types/TStands";

type ComponentProps = {
  /**
   * Stand details
   */
  stand?: TStand;
  /**
   * Loading show skeleton card
   */
  loading?: boolean;
};

export const StandCardCarousel: React.FC<ComponentProps> = ({
  stand = mockStand,
  loading,
}) => (
  <IonCard className={styles.card}>
    <IonCardContent className={`${styles.cardContent} ${styles.noPadding}`}>
      <IonGrid className={styles.noPadding}>
        <IonRow>
          <IonCol size="8" className={styles.colContent}>
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <p className={styles.skeletonText}>
                  .....................................
                  .....................................
                  .....................................
                </p>
              </>
            ) : (
              <>
                <IonCardTitle className={styles.title}>
                  {stand.name}
                </IonCardTitle>
                <Stars stars={stand.stars} />
                <p className={styles.slogan}>{stand.slogan}</p>
              </>
            )}
          </IonCol>
          <IonCol className={styles.noPadding}>
            {loading && (
              <Skeleton className={styles.skeletonImage} height="100%" />
            )}
            <img
              src={getImage(stand.photoUrl)}
              alt={stand.name}
              className={styles.image}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  </IonCard>
);
