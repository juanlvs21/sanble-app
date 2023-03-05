import { IonSpinner } from "@ionic/react";

import styles from "./Offline.module.css";

export const Offline = () => {
  return (
    <section
      className={`${styles.offLineSection} animate__animated animate__fadeIn`}
    >
      <IonSpinner className={styles.spinner} color="light" />
      <span>Reconectando...</span>
      <small>Has perdido tu conexión a internet</small>
    </section>
  );
};
