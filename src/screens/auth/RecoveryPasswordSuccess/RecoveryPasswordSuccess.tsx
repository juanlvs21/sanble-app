import { IonCol, IonGrid, IonRow } from "@ionic/react";
import { Link } from "react-router-dom";

import { Button } from "@/components/common/buttons/Button";
import { useDocumentTitleApp } from "@/hooks/useDocumentTitle";
import { ERoutesName } from "@/types/TRoutes";
import styles from "../Auth.module.css";

export const RecoveryPasswordSuccess = () => {
  useDocumentTitleApp("Recuperar Contraseña");

  return (
    <IonGrid
      className={`animate__animated animate__fadeIn ${styles.authScreenContainer}`}
    >
      <IonRow>
        <IonCol>
          <h1 className={styles.title}>Recuperación enviada</h1>
          <span className={styles.titleLineSignIn} />
          <p className={styles.subtitle}>
            Hemos enviado un correo electrónico de recuperación de contraseña.
            Si no logras verlo, revisa tu bandeja de spam o reenvia el correo
            electrónico
          </p>
        </IonCol>
      </IonRow>
      <IonRow className={styles.formContainer}>
        <Link to={ERoutesName.SESSION_SIGNIN}>
          <Button expand="block" color="primary" className={styles.btn}>
            Ir al inicio de sesión
          </Button>
        </Link>

        <Link
          to={ERoutesName.SESSION_RECOVERY_PASSWORD}
          className={`${styles.recoveryPasswordToSignin}`}
        >
          Reenviar correo electrónico de recuperación
        </Link>
      </IonRow>
    </IonGrid>
  );
};
