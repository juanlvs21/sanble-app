import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
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

const VerifyEmail: React.FC<ContainerProps> = ({ loading, errors }) => (
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

    <h1 className={styles.title}>
      {loading
        ? "Verificando "
        : !errors
        ? "Se verificó "
        : "No se pudo verificar "}
      tu correo electrónico
    </h1>

    <p>
      {!loading && !errors
        ? "Ahora puedes acceder con tu cuenta nueva"
        : !loading && errors
        ? `${errors}`
        : ""}
    </p>

    {!loading && !errors && (
      <IonButton
        className={styles.btn}
        expand="block"
        color="primary"
        fill="outline"
        routerLink="/auth/login"
      >
        Iniciar Sesión
      </IonButton>
    )}
  </div>
);

export default VerifyEmail;
