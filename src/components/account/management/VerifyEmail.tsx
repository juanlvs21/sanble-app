import React from "react";
import { IonButton } from "@ionic/react";

// Styles
import styles from "./Management.module.css";

// Components
import LoaderVerifyCode from "./LoaderVerifyCode";

interface ContainerProps {
  loading: boolean;
  errors: string;
}

const VerifyEmail: React.FC<ContainerProps> = ({ loading, errors }) => (
  <div className="text_center">
    <LoaderVerifyCode loading={loading} errors={errors} />

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
