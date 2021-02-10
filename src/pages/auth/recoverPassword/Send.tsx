import React from "react";
import { IonButton } from "@ionic/react";

// Layouts
import Layout from "../../../layouts/Auth";

// Styles
import styles from "../Auth.module.css";

const RecoverPasswordSend: React.FC = () => {
  return (
    <Layout compact={true}>
      <div className={styles.center_container}>
        <h1>Recuperar de Contraseña</h1>

        <p>
          Hemos enviado un mensaje de recuperación de contraseña a tu dirección
          de correo electrónico.
        </p>

        <IonButton
          expand="block"
          color="primary"
          fill="outline"
          routerLink="/auth/login"
        >
          Iniciar Sesión
        </IonButton>
      </div>
    </Layout>
  );
};

export default RecoverPasswordSend;
