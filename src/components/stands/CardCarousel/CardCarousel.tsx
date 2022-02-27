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

export const StandCardCarousel: React.FC = () => {
  return (
    <IonCard className={styles.card}>
      <IonCardContent className={`${styles.cardContent} ${styles.noPadding}`}>
        <IonGrid className={styles.noPadding}>
          <IonRow>
            <IonCol size="8" className={styles.colContent}>
              <IonCardTitle className={styles.title}>Nombre feria</IonCardTitle>
              <Stars stars={3} />
              <p className={styles.description}>
                This is content, without any paragraph or header tags, within an
                ion-cardContent element.
              </p>
            </IonCol>
            <IonCol className={styles.noPadding}>
              <img
                src="https://www.iica.int/sites/default/files/ckeditor-images/feriacomidas.JPG"
                alt="Feria"
                className={styles.image}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
