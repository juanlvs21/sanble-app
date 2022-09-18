import { IonRow, IonCol } from "@ionic/react";

import styles from "./Auth.module.css";

const Signup: React.FC = () => {
  return (
    <IonRow className={styles.authScreenContainer}>
      <IonCol>
        <h1 className={styles.title}>Crea tu Cuenta</h1>
        <p className={styles.subtitle}>Unete a la Plataforma de Sanble</p>
      </IonCol>
    </IonRow>
  );
};

export default Signup;
