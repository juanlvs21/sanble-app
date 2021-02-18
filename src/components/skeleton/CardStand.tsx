import React from "react";
import {
  IonSkeletonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

// Styles
import styles from "./CardStand.module.css";

// Component
import Image from "./Image";

const CardStandSkeleton: React.FC = () => {
  return (
    <IonCard>
      <div className={styles.container}>
        <div>
          <Image className={styles.img} />
        </div>
        <div className={styles.content}>
          <IonCardHeader>
            <IonCardTitle>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </IonCardTitle>
            <IonCardSubtitle>
              <IonSkeletonText animated style={{ width: "70%" }} />
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonSkeletonText animated />
            <IonSkeletonText animated />
            <IonSkeletonText animated />
          </IonCardContent>
        </div>
      </div>
    </IonCard>
  );
};

export default CardStandSkeleton;
