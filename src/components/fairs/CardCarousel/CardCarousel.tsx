import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonRow,
  IonTitle,
} from "@ionic/react";

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
              <IonTitle className={styles.title}>Nombre feria</IonTitle>
              <p className={styles.description}>
                This is content, without any paragraph or header tags, within an
                ion-cardContent element.
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
