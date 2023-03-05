import { IonSpinner } from "@ionic/react";

import styles from "../Loaders.module.css";

export const LoadingSuspense = () => (
  <div
    className={`animate__animated animate__fadeIn ${styles.loadingSuspenseContainer}`}
  >
    <IonSpinner />
  </div>
);
