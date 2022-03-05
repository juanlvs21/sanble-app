import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonCardTitle,
  IonBadge,
} from "@ionic/react";
import { FiCalendar, FiClock } from "react-icons/fi";

import styles from "./CardCarousel.module.css";
import { mockFair } from "@/utils/mockData";
import { dateFormat } from "@/utils/dateFormat";
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
}) => {
  if (loading) {
    return <p>Cargando</p>;
  }

  return (
    <IonCard className={styles.card}>
      <IonCardContent className={`${styles.cardContent} ${styles.noPadding}`}>
        <IonGrid className={styles.noPadding}>
          <IonRow>
            <IonCol size="4" className={styles.noPadding}>
              <img
                src="https://www.iica.int/sites/default/files/ckeditor-images/feriacomidas.JPG"
                alt="Feria"
                className={styles.image}
              />
            </IonCol>
            <IonCol size="8" className={styles.colContent}>
              <IonCardTitle className={styles.title}>{fair.name}</IonCardTitle>
              <p className={styles.description}>{fair.description}</p>
              <div className={styles.badgeContainer}>
                <IonBadge color="primary" className={styles.badge}>
                  <FiCalendar size={15} className={styles.badgeIcon} />
                  {dateFormat(fair.date_time, "DD MMM - HH:mm a")}
                </IonBadge>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
