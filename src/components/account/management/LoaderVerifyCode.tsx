import React from "react";
import { IonIcon } from "@ionic/react";
import {
  checkmarkCircleOutline,
  closeCircleOutline,
  reloadCircleOutline,
} from "ionicons/icons";

// Styles
import styles from "./Management.module.css";

interface ContainerProps {
  loading: boolean;
  errors: string;
}

const LoaderVerifyCode: React.FC<ContainerProps> = ({ loading, errors }) => {
  return (
    <div className="text_center">
      {loading ? (
        <IonIcon
          icon={reloadCircleOutline}
          className={`${styles.icon} ${styles.spin}`}
        />
      ) : !errors ? (
        <IonIcon icon={checkmarkCircleOutline} className={styles.icon} />
      ) : (
        <IonIcon icon={closeCircleOutline} className={styles.icon} />
      )}
    </div>
  );
};

export default LoaderVerifyCode;
