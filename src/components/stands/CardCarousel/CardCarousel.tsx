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
}) => {
  if (loading) {
    return <p>Cargando</p>;
  }

  return (
    <IonCard className={styles.card}>
      <IonCardContent className={`${styles.cardContent} ${styles.noPadding}`}>
        <IonGrid className={styles.noPadding}>
          <IonRow>
            <IonCol size="8" className={styles.colContent}>
              <IonCardTitle className={styles.title}>{stand.name}</IonCardTitle>
              <Stars stars={stand.stars} />
              <p className={styles.slogan}>{stand.slogan}</p>
            </IonCol>
            <IonCol className={styles.noPadding}>
              <img
                src={getImage(stand.url_photo)}
                alt={stand.name}
                className={styles.image}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};
