import React from "react";
import { IonButton } from "@ionic/react";

// Layouts
import Layout from "../../../layouts/Auth";

const RecoverPasswordSend: React.FC = () => {
  return (
    <Layout compact={true}>
      <div className="text_center">
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
