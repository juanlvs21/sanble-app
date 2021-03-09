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
import styles from "./Stands.module.css";

// Component
import Image from "../Image";

const StandsCardSkeleton: React.FC = () => {
  return (
    <IonCard className={styles.card}>
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

export default StandsCardSkeleton;
