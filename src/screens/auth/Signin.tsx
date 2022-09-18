import { IonRow, IonCol } from "@ionic/react";

import styles from "./Auth.module.css";

const Signin: React.FC = () => {
  return (
    <IonRow className={styles.authScreenContainer}>
      <IonCol>
        <h1>Entrar</h1>
      </IonCol>
    </IonRow>
  );
};

export default Signin;
