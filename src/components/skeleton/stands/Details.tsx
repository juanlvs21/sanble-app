import React from "react";
import { IonCard, IonSkeletonText } from "@ionic/react";

// Styles
import styles from "./Stands.module.css";

// Components
import ImageSkeleton from "../Image";

const StandsDetailsSkeleton: React.FC = () => {
  return (
    <div className={styles.details_container}>
      <ImageSkeleton className={styles.details_img} />

      <IonCard className={styles.details_card}>
        <IonSkeletonText
          animated
          style={{ width: "95%", height: 20, margin: 20 }}
        />

        <div className={styles.details_description}>
          <IonSkeletonText animated style={{ width: "100%" }} />
          <IonSkeletonText animated style={{ width: "100%" }} />
          <IonSkeletonText animated style={{ width: "100%" }} />
        </div>
      </IonCard>
    </div>
  );
};

export default StandsDetailsSkeleton;
