import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonCardTitle,
  IonBadge,
} from "@ionic/react";
import { FiCalendar } from "react-icons/fi";

import styles from "./CardCarousel.module.css";
import { Skeleton } from "@/components/common/Skeleton";
import { mockFair } from "@/utils/mockData";
import { dateFormat } from "@/utils/dateFormat";
import { getFairCover } from "@/utils/getFairCover";
import { TFair } from "@/types/TFairs";

type ComponentProps = {
  /**
   * Fair details
   */
  fair?: TFair;
  /**
   * Loading show skeleton card
   */
  loading?: boolean;
};

export const FairCardCarousel: React.FC<ComponentProps> = ({
  fair = mockFair,
  loading,
}) => (
  <IonCard className={styles.card}>
    <IonCardContent className={`${styles.cardContent} ${styles.noPadding}`}>
      <IonGrid className={styles.noPadding}>
        <IonRow>
          <IonCol size="4" className={styles.noPadding}>
            {loading && (
              <Skeleton className={styles.skeletonImage} height="100%" />
            )}
            <img
              src={getFairCover(fair.photographs || [])}
              alt="Feria"
              className={styles.image}
            />
          </IonCol>
          <IonCol size="8" className={styles.colContent}>
            {loading ? (
              <>
                <IonCardTitle className={styles.title}>
                  <Skeleton />
                </IonCardTitle>
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
                  {fair.name}
                </IonCardTitle>
                <p className={styles.description}>{fair.description}</p>
                <div className={styles.badgeContainer}>
                  <IonBadge color="primary" className={styles.badge}>
                    <FiCalendar size={15} className={styles.badgeIcon} />
                    {dateFormat(fair.dateTime, "DD MMM - HH:mm a")}
                  </IonBadge>
                </div>
              </>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  </IonCard>
);
