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

export const FairCardCarousel: React.FC = () => {
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
              <IonCardTitle className={styles.title}>Nombre feria</IonCardTitle>
              <p className={styles.description}>
                This is content, without any paragraph or header tags, within an
                ion-cardContent element.
              </p>
              <div className={styles.badgeContainer}>
                <IonBadge color="primary">
                  <FiCalendar size={14} className={styles.badge} />
                  17ago
                </IonBadge>
                <IonBadge color="primary">
                  <FiClock size={14} className={styles.badge} />
                  7:30pm
                </IonBadge>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
